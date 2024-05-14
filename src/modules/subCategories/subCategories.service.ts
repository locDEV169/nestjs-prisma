import { Prisma } from '.prisma/client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { SubCategoriesRequestDto } from './subCategories.dto'

@Injectable()
export class SubCategoriesService {
    constructor(private prisma: PrismaService) {}
    create(data: SubCategoriesRequestDto) {
        return this.prisma.subCategory.create({
            data: data,
            select: { id: true }
        })
    }

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.subCategoryWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.name = { contains: keyword, mode: 'insensitive' }
        }

        const [totalRecords, data] = await Promise.all([
            this.prisma.subCategory.count({ where }),
            this.prisma.subCategory.findMany({
                where,
                include: { category: { select: { id: true, name: true, image: true } } },
                take: limit,
                skip: limit * (page - 1),
                orderBy: { id: 'asc' }
            })
        ])
        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.subCategory.findUnique({
            where: { id: id },
            include: { category: true }
        })

        return { data }
    }

    async update(id: number, data: SubCategoriesRequestDto) {
        return this.prisma.subCategory.update({ where: { id: id }, data: data })
    }

    async remove(id: number) {
        const data = await this.prisma.subCategory.findUnique({ where: { id: id }, select: { products: true } })

        if (data.products.length !== 0) throw new BadRequestException([{ field: 'product', message: 'INVALID_PRODUCT' }])
        return this.prisma.subCategory.delete({ where: { id: id } })
    }
}
