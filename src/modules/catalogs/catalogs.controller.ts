import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common'
import { Public } from 'src/common/guard'
import { MainValidationPipe } from 'src/common/validation.pipe'
import { SearchRequestDto } from '../../common/pagination.dto'
import { CatalogRequestDto } from './catalogs.dto'
import { CatalogsService } from './catalogs.service'

@Controller('catalogs')
export class CatalogsController {
    constructor(private readonly catalogService: CatalogsService) {}

    @Public()
    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.catalogService.findAll(query)
    }

    @Get(':catalog')
    async getProductById(@Param('catalog', ParseIntPipe) catalog: number) {
        return this.catalogService.findOne(catalog)
    }

    @Post('create')
    @UsePipes(new MainValidationPipe())
    async createProduct(@Body() postData: CatalogRequestDto) {
        return this.catalogService.create(postData)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateProductById(@Param('id', ParseIntPipe) id: number, @Body() data: CatalogRequestDto) {
        return this.catalogService.update(id, data)
    }

    @Delete('delete/:id')
    async removeProductById(@Param('id', ParseIntPipe) id: number) {
        return this.catalogService.remove(id)
    }

    @Put('update/image/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateImage(@Param('id', ParseIntPipe) id: number, @Body() data: CatalogRequestDto) {
        return this.catalogService.updateImage(id, data)
    }

    @Get('attribute/:id')
    async findAttribute(@Param('id', ParseIntPipe) id: number) {
        return this.catalogService.findAttribute(id)
    }
}
