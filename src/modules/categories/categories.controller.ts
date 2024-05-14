import { Controller, Get, Param, Query, UsePipes, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesRequestDto } from './categories.dto'
import { SearchRequestDto } from '../../common/pagination.dto'
import { MainValidationPipe } from 'src/common/validation.pipe'

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UsePipes(new MainValidationPipe())
    findAll(@Query() query: SearchRequestDto) {
        return this.categoriesService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id)
    }

    @Post('create')
    @UsePipes(new MainValidationPipe())
    create(@Body() data: CategoriesRequestDto) {
        return this.categoriesService.create(data)
    }

    @Put('update/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    updateBrandById(@Param('id', ParseIntPipe) id: number, @Body() updateBrand: CategoriesRequestDto) {
        return this.categoriesService.update(id, updateBrand)
    }

    @Delete('delete/:id')
    deleteBrandById(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.delete(id)
    }

    @Put('update/image/:id')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async updateImage(@Param('id', ParseIntPipe) id: number, @Body() data: CategoriesRequestDto) {
        return this.categoriesService.updateImage(id, data)
    }

    @Get('sub-categories/:id')
    findsubCategories(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findsubCategories(id)
    }
}
