import { Prisma } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { CatalogRequestDto } from './catalogs.dto'

@Injectable()
export class CatalogsService {
    constructor(private prisma: PrismaService) {}

    async findOne(catalog: number) {
        const data = await this.prisma.catalog.findUnique({
            where: { catalog: catalog },
            include: {
                products: {
                    select: {
                        id: true,
                        name: true,
                        referenceLink: true,
                        subCategory: { include: { category: { select: { id: true, name: true } } } }
                    }
                },
                value: { include: { attribute: true } }
            }
        })

        return { data }
    }

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { limit = 10, keyword, page = 1, number } = input

        const where: Prisma.CatalogWhereInput = {}
        if (keyword)
            where.OR = [
                { name: { contains: keyword, mode: 'insensitive' } },
                { dimensions: { contains: keyword, mode: 'insensitive' } },
                { dimensionsMetric: { contains: keyword, mode: 'insensitive' } },
                { electrical: { contains: keyword, mode: 'insensitive' } }
            ]
        if (number)
            where.OR = [
                { catalog: { equals: number } },
                { estimatedShippingWeight: { equals: number } },
                { estimatedShippingWeightMetric: { equals: number } }
            ]

        const [totalRecords, data] = await Promise.all([
            this.prisma.catalog.count({ where }),
            this.prisma.catalog.findMany({ where, skip: limit * (page - 1), take: limit })
        ])
        return { data, totalRecords, page }
    }

    async generateCode() {
        let catalog: number
        while (true) {
            catalog = Math.floor(10000000 + Math.random() * 90000000)
            const exist = await this.prisma.catalog.count({ where: { catalog } })
            if (!exist) break
        }
        return catalog
    }

    async create(data: CatalogRequestDto) {
        const catalog = await this.generateCode()

        return this.prisma.catalog.create({
            select: { id: true },
            data: {
                ...data,
                catalog: catalog
            }
        })
    }

    async update(id: number, data: CatalogRequestDto) {
        return this.prisma.catalog.update({
            where: { id: id },
            data: data,
            select: { id: true }
        })
    }

    async findAttribute(id: number) {
        const data = await this.prisma.catalog.findUnique({
            where: { id },
            select: { value: true }
        })

        return { data }
    }

    async remove(id: number) {
        const catalog = this.prisma.catalog.deleteMany({ where: { id: id } })
        const value = this.prisma.value.deleteMany({ where: { catalogId: id } })

        return this.prisma.$transaction([catalog, value])
    }

    async updateImage(id: number, input: CatalogRequestDto) {
        const data = await this.prisma.catalog.update({
            where: { id },
            data: { image: input.image },
            select: { id: true, image: true }
        })

        return { data }
    }
}
