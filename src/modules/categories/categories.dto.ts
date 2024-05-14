import { IsNotEmpty, IsString } from 'class-validator'

export class CategoriesRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    referenceLink: string
}
