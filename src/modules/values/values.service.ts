import { Prisma } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { ValuesRequestDto } from './values.dto'

@Injectable()
export class ValuesService {
    constructor(private prisma: PrismaService) {}
    async create(data: ValuesRequestDto) {
        const { attributeId } = data
        const attribute = await this.prisma.attribute.findMany({
            where: { AND: [{ id: attributeId }, { type: 'select' }] }
        })
        const a = attribute.map((data) => data.value)
        const b = a.toString().split('|')

        for (const letter of b) {
            console.log(letter === 'B')
        }
        // return this.prisma.value.createMany({
        //     data: data
        // })
    }

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { limit = 10, keyword, page = 1 } = input

        const where: Prisma.CatalogWhereInput = {}
        if (keyword) where.name = { contains: keyword, mode: 'insensitive' }

        const [totalRecords, data] = await Promise.all([
            this.prisma.catalog.count({ where }),
            this.prisma.catalog.findMany({
                where,
                skip: limit * (page - 1),
                take: limit
            })
        ])
        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.value.findUnique({
            where: { id: id },
            include: { attribute: true }
        })

        return { data }
    }

    async update(id: number, input: ValuesRequestDto) {
        const catalog = await this.prisma.catalog.findUnique({
            where: { id: id },
            select: { value: true }
        })

        if (catalog.value) {
            const value = this.prisma.value.deleteMany({ where: { catalogId: id } })

            const data = this.prisma.catalog.update({
                where: { id: id },
                data: { value: { createMany: { data: input } } },
                select: { id: true }
            })
            return this.prisma.$transaction([value, data])
        } else {
            return this.prisma.catalog.update({
                where: { id: id },
                data: { value: { createMany: { data: input } } },
                select: { id: true }
            })
        }
    }

    async remove(id: number) {
        return this.prisma.value.delete({ where: { id: id } })
    }

    async findProduct(id: number) {
        const attribute = await this.prisma.catalog.findMany({
            where: { id: id },
            select: {
                products: {
                    select: { attributes: { select: { attribute: { include: { values: { where: { catalogId: id } } } } } } }
                }
            }
        })

        const [data] = attribute.map((data) => data.products.attributes.map((a) => a.attribute))

        return { data }
    }
}
