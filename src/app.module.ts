import { Module } from '@nestjs/common'
import { CatalogsModule } from './modules/catalogs/catalogs.module'
import { PrismaService } from './modules/prisma/prisma.service'
import { AuthModule } from './modules/auth/auth.module'
import { UploadsModule } from './modules/uploads/uploads.module'
import { SubCategoriesModule } from './modules/subCategories/subCategories.module'
import { ProductsModule } from './modules/products/products.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { DashboardsModule } from './modules/dashboard/dashboard.module'
import { AttributesModule } from './modules/attributes/attributes.module'
import { JwtStrategy } from './modules/guard/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/guard/jwt-auth.guard'
import { ValuesModule } from './modules/values/values.module'
import { UsersModule } from './modules/users/users.module'

@Module({
    imports: [
        CatalogsModule,
        AuthModule,
        UploadsModule,
        CategoriesModule,
        SubCategoriesModule,
        ProductsModule,
        AttributesModule,
        DashboardsModule,
        ValuesModule,
        UsersModule
    ],
    providers: [
        // JwtStrategy,
        // {
        //     provide: APP_GUARD,
        //     useClass: JwtAuthGuard
        // },
        PrismaService
    ]
})
export class AppModule {}
