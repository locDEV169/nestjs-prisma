import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
export class LoginRequestDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    username: string

    @IsNotEmpty()
    @IsString()
    @Length(3, 20)
    password: string
}

export class LoginResponseDto {
    accessToken: string

    expireIn: number
}

export class CheckUserNameExistRequestDto {
    @IsOptional()
    @IsString()
    readonly user: string
}

export class ChangePasswordRequestDto {
    @IsNotEmpty()
    @IsString()
    readonly currentPassword: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}
