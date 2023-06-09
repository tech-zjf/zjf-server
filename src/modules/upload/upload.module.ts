import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
    imports: [
    MulterModule.register({
      storage: diskStorage({
        // 指定文件存储目录
        destination: './public/upload/images',
        filename: (_, file, cb) => {
          const fileName = file.originalname;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
