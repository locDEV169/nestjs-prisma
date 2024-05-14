import {
    BadRequestException,
    HttpStatus,
    ExceptionFilter,
    ArgumentsHost,
    Catch,
    UnauthorizedException,
    HttpException,
    InternalServerErrorException
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        return response.status(HttpStatus.BAD_REQUEST).json(exception.getResponse())
    }
}

@Catch(InternalServerErrorException)
export class CommonExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception.getResponse())
    }
}
