import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import sharp from "sharp";

export class MulterToSharpPipe implements PipeTransform<Express.Multer.File, sharp.Sharp> {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata): sharp.Sharp {
    return sharp(value.buffer);
  }
}