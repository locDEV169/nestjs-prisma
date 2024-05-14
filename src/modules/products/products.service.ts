import { Prisma } from '.prisma/client'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from 'src/common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { ProductsRequestDto } from './products.dto'

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}
    async create(data: ProductsRequestDto) {
        return this.prisma.product.create({
            data: data,
            select: { id: true }
        })
    }

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.ProductWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.name = { contains: keyword, mode: 'insensitive' }
        }
        const product = await this.prisma.product.findMany({
            where,
            include: { attributes: { select: { attribute: true } } },
            take: limit,
            skip: limit * (page - 1),
            orderBy: { name: 'asc' }
        })

        const result = product.map((data) => {
            return { ...data, attributes: data.attributes.map((attribute) => attribute.attribute) }
        })

        const [totalRecords, data] = await Promise.all([this.prisma.product.count({ where }), result])

        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.product.findUnique({
            where: { id: id },
            include: {
                subCategory: true,
                category: true,
                attributes: { select: { attribute: true } }
            }
        })

        return { data: { ...data, attributes: data.attributes.map((data) => data.attribute) } }
    }

    async update(id: number, data: ProductsRequestDto) {
        return this.prisma.product.update({ where: { id: id }, data: data })
    }

    async remove(id: number) {
        const product = this.prisma.product.delete({ where: { id: id }, select: { id: true } })
        const attribute = this.prisma.attributeOnProducts.deleteMany({ where: { productId: id } })

        const data = await this.prisma.product.findUnique({ where: { id: id }, select: { catalogs: true } })

        if (data.catalogs.length !== 0) throw new BadRequestException([{ field: 'subCategories', message: 'INVALID_CATALOGS' }])
        return this.prisma.$transaction([attribute, product])
    }

    async findCatalog(id: number, input: SearchRequestDto) {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.CatalogWhereInput = {}

        if (keyword !== undefined && keyword.length > 0) {
            where.OR = [
                {
                    value: { some: { name: { equals: keyword, mode: 'insensitive' } } }
                }
            ]
        }

        const [totalRecords, data] = await Promise.all([
            this.prisma.catalog.count({ where: { AND: [{ productId: id }, where] } }),
            this.prisma.catalog.findMany({
                include: { value: { include: { attribute: true } } },
                where: {
                    AND: [{ productId: id }, where]
                },
                take: limit,
                skip: limit * (page - 1),
                orderBy: { id: 'asc' }
            })
        ])

        // const filter = []
        // const product = await this.prisma.product.findUnique({
        //     where: { id: id },
        //     include: {
        //         catalogs: {
        //             select: {
        //                 attribute: {
        //                     include: { attribute: { select: { id: true, name: true, values: { include: { attribute: true } } } } }
        //                 }
        //             }
        //         }
        //     }
        // })

        // product.catalogs.map((obj) => {
        //     obj.attribute.map((attribute) => {
        //         attribute.attribute.values.map((value) => {
        //             const data = {
        //                 key: value.attribute.name,
        //                 value: {
        //                     [value.name]: 1
        //                 }
        //             }
        //             if (filter.length == 0) filter.push(data)
        //             else {
        //                 let flag = true
        //                 let index = -1
        //                 for (let i = 0; i < filter.length; i++) {
        //                     if (filter[i].key == value.attribute.name) {
        //                         flag = false
        //                         index = i
        //                     }
        //                 }
        //                 if (flag) filter.push(data)
        //                 else {
        //                     if (value.name in filter[index][`value`]) filter[index][`value`][value.name]++
        //                     else filter[index][`value`][value.name] = 1
        //                 }
        //             }
        //         })
        //     })
        // })

        return { data, totalRecords, page }
    }

    async updateImage(id: number, input: ProductsRequestDto) {
        const data = await this.prisma.product.update({
            where: { id },
            data: { image: input.image },
            select: { id: true, image: true }
        })

        return { data }
    }
}
