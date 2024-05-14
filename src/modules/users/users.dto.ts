import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class UserRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    username: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    password: string

    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsOptional()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    email: string
}
