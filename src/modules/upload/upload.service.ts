import { Injectable } from '@nestjs/common';
import { UPLOAD_BASE_URL } from './upload.constant';

@Injectable()
export class UploadService {
    uploadImg(file) {
        const fileName = file.originalname;
        return UPLOAD_BASE_URL + fileName
    }
}
