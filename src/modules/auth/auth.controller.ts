import {
    BadRequestException,
    Body,
    Controller,
    HttpException,
    Param,
    Post,
    Put,
    Query,
    UseFilters,
    UsePipes
} from '@nestjs/common'
import { MainValidationPipe } from '../../common/validation.pipe'
import { ChangePasswordRequestDto, CheckUserNameExistRequestDto, LoginRequestDto } from './auth.dto'
import { AuthService } from './auth.service'
import { UnauthorizedExceptionFilter } from './auth.filter'
import { Public } from '../../common/guard'
import { UserRequestDto } from '../users/users.dto'

@Controller('auth')
@UseFilters(UnauthorizedExceptionFilter)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @UsePipes(new MainValidationPipe())
    async login(@Body() { username, password }: LoginRequestDto) {
        return this.authService.login(username, password)
    }

    @Public()
    @Post('check-username-exist')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async checkUserNameExist(@Query() query: CheckUserNameExistRequestDto) {
        return this.authService.checkUserNameExist(query)
    }

    @Put('change-password/:username')
    @UsePipes(new MainValidationPipe({ skipMissingProperties: true }))
    async changePassword(@Body() body: ChangePasswordRequestDto, @Param('username') username: string) {
        return this.authService.changePassword(body, username)
    }

    @UsePipes(new MainValidationPipe())
    @Post('sign-up')
    async signUp(@Body() body: UserRequestDto) {
        return this.authService.signUp(body).catch((err) => {
            if (err instanceof HttpException) throw err
            else if (err instanceof HttpException) throw err
            else throw new BadRequestException([{ message: err }])
        })
    }
}
