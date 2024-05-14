import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class SubCategoriesRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    categoryId: number
}
