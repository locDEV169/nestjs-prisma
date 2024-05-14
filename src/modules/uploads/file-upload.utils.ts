import { HttpException, HttpStatus } from '@nestjs/common'
export const imageFileFilter = (req, image, callback) => {
    if (!image.originalname.match(/\.(|jpg|jpeg|png|gif)$/)) {
        return callback(new HttpException('Unsupported File Type', HttpStatus.BAD_REQUEST), false)
    }
    callback(null, true)
}

export const maxSize = 5 * 1024 * 1024
