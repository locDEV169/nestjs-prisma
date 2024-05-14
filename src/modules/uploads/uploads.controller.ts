import { Controller, Delete, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { nanoid } from 'nanoid'
import * as path from 'path'
import * as fs from 'fs'
import { imageFileFilter, maxSize } from '../uploads/file-upload.utils'
import { Public } from '../../common/guard'

@Controller('uploads')
export class UploadsController {
    @Public()
    @Post('image')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './image',
                filename: (req, images, cb) => {
                    const randomName = nanoid()
                    const extension = path.extname(images.originalname)
                    return cb(null, `${randomName}${extension}`)
                }
            }),
            fileFilter: imageFileFilter,
            limits: { fileSize: maxSize }
        })
    )
    uploadImage(@UploadedFile() images) {
        const url = `${images.path}`.split(path.sep).join('/')
        return {
            image: url
        }
    }

    @Public()
    @Get('image/:fileId')
    async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, { root: 'image' })
    }

    @Public()
    @Delete('image/:fileId')
    async deleteImage(@Param('fileId') fileId): Promise<any> {
        fs.unlinkSync(`image/${fileId}`)
        return {
            image: fileId
        }
    }
}
