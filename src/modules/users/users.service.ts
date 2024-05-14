import { Prisma } from '.prisma/client'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { PaginationResponseDto, SearchRequestDto } from '../../common/pagination.dto'
import { PrismaService } from '../prisma/prisma.service'
import { UserRequestDto } from './users.dto'

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(input: SearchRequestDto): Promise<PaginationResponseDto> {
        const { page = 1, limit = 10, keyword } = input

        const where: Prisma.UserWhereInput = {}
        if (keyword !== undefined && keyword.length > 0) {
            where.username = { contains: keyword, mode: 'insensitive' }
        }

        const [totalRecords, data] = await Promise.all([
            this.prisma.user.count({ where }),
            this.prisma.user.findMany({
                where,
                take: limit,
                skip: limit * (page - 1),
                orderBy: { username: 'asc' }
            })
        ])

        return { data, totalRecords, page }
    }

    async findOne(id: number) {
        const data = await this.prisma.user.findUnique({
            where: { id: id }
        })

        return { data }
    }

    async profile(username: string) {
        const data = await this.prisma.user.findUnique({
            where: { username: username }
        })

        return { data }
    }

    async update(username: string, input: UserRequestDto) {
        await this.prisma.user.update({
            where: { username: username },
            data: {
                email: input.email,
                firstName: input.firstName,
                lastName: input.lastName,
                address: input.address
            }
        })

        return { status: true }
    }

    async updateUser(id: number, data: UserRequestDto) {
        await this.prisma.user.update({
            where: { id: id },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address
            }
        })

        return { status: true }
    }

    async remove(id: number) {
        return this.prisma.user.delete({ where: { id: id } })
    }
}
