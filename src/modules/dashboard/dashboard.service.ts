import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) {}

    async countAll() {
        const [categories, attribute, subCategory, catalog, product, user] = await Promise.all([
            this.prisma.category.count(),
            this.prisma.attribute.count(),
            this.prisma.subCategory.count(),
            this.prisma.catalog.count(),
            this.prisma.product.count(),
            this.prisma.user.count()
        ])

        return { categories, attribute, subCategory, catalog, product, user }
    }
}
