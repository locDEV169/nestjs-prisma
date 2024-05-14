import { Module } from '@nestjs/common'
import { SubCategoriesService } from './subCategories.service'
import { SubCategoriesController } from './subCategories.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    controllers: [SubCategoriesController],
    providers: [SubCategoriesService, PrismaService]
})
export class SubCategoriesModule {}
