import { IsNumber, IsOptional, IsString } from 'class-validator'

export class ValuesRequestDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    number: number

    @IsOptional()
    @IsNumber()
    attributeId: number

    @IsOptional()
    @IsNumber()
    catalogId: number
}
