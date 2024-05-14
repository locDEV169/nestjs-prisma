import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe, UsePipes } from '@nestjs/common'
import { SearchRequestDto } from 'src/common/pagination.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'
import { ValuesRequestDto } from './values.dto'
import { ValuesService } from './values.service'

@Controller('values')
export class ValuesController {
    constructor(private readonly valuesService: ValuesService) {}

    @Post('create')
    async create(@Body() data: ValuesRequestDto) {
        return this.valuesService.create(data)
    }

    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.valuesService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.valuesService.findOne(id)
    }

    @Put('update/:id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: ValuesRequestDto) {
        return this.valuesService.update(id, data)
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.valuesService.remove(id)
    }

    @Get('catalog/:id')
    async findProduct(@Param('id', ParseIntPipe) id: number) {
        return this.valuesService.findProduct(id)
    }
}
