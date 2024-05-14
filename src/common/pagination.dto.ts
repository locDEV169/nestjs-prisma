import { Allow, IsOptional } from 'class-validator'

export class SearchRequestDto {
    @Allow()
    @IsOptional()
    page: number

    @Allow()
    @IsOptional()
    limit: number

    @Allow()
    @IsOptional()
    keyword: string

    @Allow()
    @IsOptional()
    number: number
}

export class PaginationResponseDto {
    data: unknown[]

    page: number

    totalRecords: number
}
