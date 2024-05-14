import { Module } from '@nestjs/common'
import { AttributesService } from './attributes.service'
import { AttributesController } from './attributes.conttroller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    controllers: [AttributesController],
    providers: [AttributesService, PrismaService]
})
export class AttributesModule {}
