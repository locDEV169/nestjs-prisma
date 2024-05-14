import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, Query, ParseIntPipe } from '@nestjs/common'
import { AttributesService } from './attributes.service'
import { AttributesRequestDto } from './attributes.dto'
import { SearchRequestDto } from 'src/common/pagination.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'

@Controller('attributes')
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}

    @Post('create')
    @UsePipes(new MainValidationPipe())
    create(@Body() data: AttributesRequestDto) {
        return this.attributesService.create(data)
    }

    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.attributesService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.attributesService.findOne(id)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: AttributesRequestDto) {
        return this.attributesService.update(id, data)
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.attributesService.remove(id)
    }

    @Get('product/:id')
    async findProduct(@Param('id', ParseIntPipe) id: number) {
        return this.attributesService.findProduct(id)
    }
}
