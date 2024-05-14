import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CatalogsController } from './catalogs.controller'
import { CatalogsService } from './catalogs.service'

@Module({
    controllers: [CatalogsController],
    providers: [CatalogsService, PrismaService]
})
export class CatalogsModule {}
