import { Module } from '@nestjs/common'
import { ValuesService } from './values.service'
import { ValuesController } from './values.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    controllers: [ValuesController],
    providers: [ValuesService, PrismaService]
})
export class ValuesModule {}
