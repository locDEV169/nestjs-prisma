import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestExceptionFilter, CommonExceptionFilter } from './common/exception.filter'
import { TransformInterceptor } from './common/transform.interceptor'
import { PrismaService } from './modules/prisma/prisma.service'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })
    const prismaService: PrismaService = app.get(PrismaService)
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalFilters(new BadRequestExceptionFilter(), new CommonExceptionFilter())
    prismaService.enableShutdownHooks(app)
    await app.listen(3000)
}
bootstrap()
