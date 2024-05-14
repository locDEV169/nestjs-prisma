import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '.prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CategoriesRequestDto } from './categories.dto'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.CategoryWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.name = { contains: keyword, mode: 'insensitive' }
        }
        const [totalRecords, data] = await Promise.all([
            this.prisma.category.count({ where }),
            this.prisma.category.findMany({
                where,
                skip: limit * (page - 1),
                take: limit,
                orderBy: {
                    name: 'asc'
                }
            })
        ])
        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.category.findUnique({
            where: {
                id: id
            },
            include: { subCategories: { include: { products: { select: { id: true, name: true, image: true, note: true } } } } }
        })

        return { data }
    }

    async create(createProduct: CategoriesRequestDto) {
        return this.prisma.category.create({ select: { id: true }, data: createProduct })
    }

    async update(id: number, updateBrand: CategoriesRequestDto) {
        return this.prisma.category.update({
            where: { id: id },
            data: updateBrand,
            select: { id: true }
        })
    }

    async delete(id: number) {
        const data = await this.prisma.category.findUnique({ where: { id: id }, select: { subCategories: true } })

        if (data.subCategories.length !== 0)
            throw new BadRequestException([{ field: 'subCategories', message: 'INVALID_SUBCATEGORIES' }])
        return this.prisma.category.delete({ where: { id: id }, select: { id: true } })
    }

    async updateImage(id: number, input: CategoriesRequestDto) {
        const data = await this.prisma.category.update({
            where: { id },
            data: { image: input.image },
            select: { id: true, image: true }
        })

        return { data }
    }

    async findsubCategories(id: number) {
        const data = await this.prisma.category.findFirst({
            where: { id },
            select: { id: true, name: true, subCategories: true }
        })

        return { data }
    }
}
