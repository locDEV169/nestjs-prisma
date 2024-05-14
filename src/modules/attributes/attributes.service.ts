import { Prisma } from '.prisma/client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from 'src/common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { AttributesRequestDto } from './attributes.dto'

@Injectable()
export class AttributesService {
    constructor(private prisma: PrismaService) {}
    async create(data: AttributesRequestDto) {
        const productIds = data.products.map((product) => ({
            productId: product
        }))

        const attribute = await this.prisma.attribute.findMany()

        const name = attribute.map((a) => a.name)

        if (name.indexOf(data.name) == -1)
            return this.prisma.attribute.create({
                data: { ...data, products: { createMany: { data: productIds as { productId: number }[] } } },
                select: { id: true }
            })
        else throw new BadRequestException([{ field: 'attribute', message: 'ATTRIBUTE_EXIST' }])
    }

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.AttributeWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.OR = [
                { name: { contains: keyword, mode: 'insensitive' } },
                { value: { contains: keyword, mode: 'insensitive' } }
            ]
        }

        const result = await this.prisma.attribute.findMany({
            where,
            take: limit,
            include: { products: { select: { products: { select: { id: true, name: true } } } } },
            skip: limit * (page - 1),
            orderBy: { id: 'asc' }
        })

        const products = result.map((data) => {
            return { ...data, products: data.products.map((data) => data.products) }
        })

        const [totalRecords, data] = await Promise.all([
            this.prisma.attribute.count({
                where
            }),
            products
        ])
        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.attribute.findUnique({
            where: { id: id },
            include: { products: { select: { products: { select: { id: true, name: true, image: true } } } } }
        })

        return { data: { ...data, products: data.products.map((data) => data.products) } }
    }

    async update(id: number, data: AttributesRequestDto) {
        const productIds = data.products.map((product) => ({
            productId: product
        }))

        const attribute = await this.prisma.attribute.findUnique({
            where: { id: id },
            select: { products: true }
        })

        if (attribute.products) {
            const product = this.prisma.attributeOnProducts.deleteMany({ where: { attributeId: id } })

            const attribute = this.prisma.attribute.update({
                where: { id: id },
                data: { ...data, products: { createMany: { data: productIds as { productId: number }[] } } }
            })

            return this.prisma.$transaction([product, attribute])
        } else {
            return this.prisma.attribute.update({
                where: { id: id },
                data: { ...data, products: { createMany: { data: productIds as { productId: number }[] } } }
            })
        }
    }

    async remove(id: number) {
        const product = this.prisma.attributeOnProducts.deleteMany({ where: { attributeId: id } })
        const value = this.prisma.value.deleteMany({ where: { attributeId: id } })
        const attribute = this.prisma.attribute.delete({ where: { id: id }, select: { id: true } })

        return this.prisma.$transaction([product, value, attribute])
    }

    async findProduct(id: number) {
        const data = await this.prisma.attributeOnProducts.findMany({ where: { productId: id }, select: { attribute: true } })

        return { data: data.map((data) => data.attribute) }
    }
}
