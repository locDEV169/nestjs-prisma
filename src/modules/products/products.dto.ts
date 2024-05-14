import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class ProductsRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    image: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsOptional()
    note: string

    @IsString()
    @IsOptional()
    feature: string

    @IsString()
    referenceLink: string

    @IsNumber()
    subCategoryId: number

    @IsNumber()
    categoryId: number
}
