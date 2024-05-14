import { BadRequestException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

export class MainValidationPipe extends ValidationPipe {
    constructor(options: ValidationPipeOptions = {}) {
        super({
            whitelist: true,
            transformOptions: { enableImplicitConversion: true },
            exceptionFactory: customErrorFactory,
            ...options
        })
    }
}
function customErrorFactory(errors: ValidationError[]) {
    const messages = errors.map((error) => {
        return {
            field: `${error.property}`,
            message: Object.values(error.constraints).join(',')
        }
    })
    throw new BadRequestException(messages)
}
