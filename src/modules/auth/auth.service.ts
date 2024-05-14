import { ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { EXPIRE_IN } from '../../constants/app.constants'
import { PrismaService } from '../prisma/prisma.service'
import { UserRequestDto } from '../users/users.dto'
import { ChangePasswordRequestDto, CheckUserNameExistRequestDto, LoginResponseDto } from './auth.dto'
import { UtilsService } from './utils.service'

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(username: string, password: string): Promise<LoginResponseDto> {
        const user = await this.prisma.user.findUnique({
            where: { username: username }
        })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                throw new UnauthorizedException({ message: ['Invalid Username or Password !!!'] })
            }
        } else {
            throw new UnauthorizedException({ message: ['User Not Found !!!'] })
        }
        const accessToken = this.jwtService.sign({ userId: user.id }, { expiresIn: EXPIRE_IN })

        return {
            ...user,
            accessToken: accessToken,
            expireIn: EXPIRE_IN
        }
    }

    async checkUserNameExist(input: CheckUserNameExistRequestDto) {
        const { user } = input
        const where: Prisma.UserWhereInput = {}
        if (user !== undefined && user.length > 0) {
            where.username = { contains: user, mode: 'insensitive' }
        }
        const person = await this.prisma.user.count({ where })
        if (person) return { status: true }
        return { status: false }
    }

    async changePassword(input: ChangePasswordRequestDto, username: string) {
        const user = await this.prisma.user.findFirst({ where: { username } })
        if (!user) throw new ForbiddenException([{ field: 'user', message: 'USER_NOT_FOUND' }])
        if (!UtilsService.getInstance().compareHash(input.currentPassword, user.password)) {
            throw new ForbiddenException([{ field: 'password', message: 'PASSWORD_INCORRECT' }])
        }
        await this.prisma.user.update({
            where: { username: username },
            data: { password: UtilsService.getInstance().hashValue(input.password) }
        })
        return { status: true }
    }

    async signUp(input: UserRequestDto) {
        const userExist = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: input.email, mode: 'insensitive' } },
                    { username: { equals: input.username, mode: 'insensitive' } }
                ]
            }
        })
        if (userExist?.email.toLowerCase() === input.email.toLowerCase())
            throw new UnprocessableEntityException([{ field: 'email', message: 'EMAIL_EXIST' }])
        if (userExist?.username.toLowerCase() === input.username.toLowerCase())
            throw new UnprocessableEntityException([{ field: 'username', message: 'USERNAME_EXIST' }])
        await this.prisma.user.create({
            data: {
                email: input.email,
                username: input.username,
                firstName: input.firstName,
                lastName: input.lastName,
                password: UtilsService.getInstance().hashValue(input.password),
                address: input.address
            }
        })
        return { status: true }
    }
}
