import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe, UsePipes, UseGuards } from '@nestjs/common'
import { SearchRequestDto } from 'src/common/pagination.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'
import { JwtAuthGuard } from '../guard/jwt-auth.guard'
import { SubCategoriesRequestDto } from './subCategories.dto'
import { SubCategoriesService } from './subCategories.service'

@Controller('sub-categories')
// @UseGuards(JwtAuthGuard)
export class SubCategoriesController {
    constructor(private readonly subCategoriessService: SubCategoriesService) {}

    @Post('create')
    @UsePipes(new MainValidationPipe())
    async create(@Body() createApplicationDto: SubCategoriesRequestDto) {
        return this.subCategoriessService.create(createApplicationDto)
    }

    @Get()
    @UsePipes(new MainValidationPipe())
    async findAll(@Query() query: SearchRequestDto) {
        return this.subCategoriessService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.subCategoriessService.findOne(id)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateApplicationDto: SubCategoriesRequestDto) {
        return this.subCategoriessService.update(id, updateApplicationDto)
    }

    @Delete('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.subCategoriessService.remove(id)
    }
}
