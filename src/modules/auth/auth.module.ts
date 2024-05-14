import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EXPIRE_IN, jwtConstants } from '../../constants/app.constants'
import { PrismaService } from '../prisma/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from '../guard/jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: EXPIRE_IN }
        })
    ],
    providers: [AuthService, PrismaService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
