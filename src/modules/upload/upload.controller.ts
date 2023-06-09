import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService:UploadService) {}
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile() file) {
        const url = await this.uploadService.uploadImg(file)
        return url;
    }
}
