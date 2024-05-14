import { IsNotEmpty, IsPositive, IsString, IsNumber, IsOptional, Min } from 'class-validator'

export class CatalogRequestDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    image: string

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    estimatedShippingWeight: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    estimatedShippingWeightMetric: number

    @IsNotEmpty()
    @IsString()
    dimensions: string

    @IsNotEmpty()
    @IsString()
    dimensionsMetric: string

    @IsOptional()
    @IsString()
    electrical: string

    @IsOptional()
    @IsString()
    feature: string

    @IsOptional()
    @IsNumber()
    width: number

    @IsOptional()
    @IsNumber()
    depth: number

    @IsOptional()
    @IsNumber()
    height: number

    @IsOptional()
    @IsNumber()
    widthMetric: number

    @IsOptional()
    @IsNumber()
    depthMetric: number

    @IsOptional()
    @IsNumber()
    heightMetric: number

    @IsOptional()
    @Min(1)
    @IsNumber()
    price: number

    @IsOptional()
    productId: number
}
