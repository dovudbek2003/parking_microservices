import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { FileBadRequest } from "src/modules/file-service/exception/file.exception";

export const fileOption: MulterOptions = {
    storage: diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: (err: Error | null, destination: string) => void
        ) => {
            const uploadPath = 'upload';

            if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath)
            }

            cb(null, uploadPath)
        },
        
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: (err: Error | null, destination: string) => void
        ): void => {
            cb(
                null,
                `${file.mimetype.split('/')[0]}__${Date.now()}.${file.mimetype.split('/')[1]}`
            )
        },
    }),

    fileFilter: (
        req: Request,
        file: Express.Multer.File,
        cb: (err: Error | null, destination: boolean) => void
    ) => {
        const fileType = file.mimetype.split('/')[0]
        if (fileType === 'image') {
            cb(null, true)
        } else {
            cb(new FileBadRequest(fileType), false)
        }
    }
}