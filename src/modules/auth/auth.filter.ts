import { UnauthorizedException, HttpStatus, ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response } from 'express'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>()
        return response.status(HttpStatus.UNAUTHORIZED).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: exception.message,
            data: [{ field: 'account', message: 'INVALID_CREDENTIALS' }]
        })
    }
}
