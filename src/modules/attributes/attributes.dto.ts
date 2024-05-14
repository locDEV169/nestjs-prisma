import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class AttributesRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    value: string

    @IsNotEmpty()
    @IsString()
    type: string

    @IsOptional()
    @IsString()
    unit: string

    @IsOptional()
    products: unknown[]
}
