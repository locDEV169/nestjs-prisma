import { Controller, Get, Post, Body, Param, Delete, UsePipes, Query, Put, ParseIntPipe } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsRequestDto } from './products.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'
import { SearchRequestDto } from 'src/common/pagination.dto'
import { Public } from 'src/common/guard'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('create')
    @UsePipes(new MainValidationPipe())
    async create(@Body() createEquipmentDto: ProductsRequestDto) {
        return this.productsService.create(createEquipmentDto)
    }

    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.productsService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateEquipmentDto: ProductsRequestDto) {
        return this.productsService.update(id, updateEquipmentDto)
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.remove(id)
    }

    @Get('catalog/:id')
    @UsePipes(new MainValidationPipe())
    async findCatalog(@Param('id', ParseIntPipe) id: number, @Query() query: SearchRequestDto) {
        return this.productsService.findCatalog(id, query)
    }

    @Put('update/image/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateImage(@Param('id', ParseIntPipe) id: number, @Body() data: ProductsRequestDto) {
        return this.productsService.updateImage(id, data)
    }
}
