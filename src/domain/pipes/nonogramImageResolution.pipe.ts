import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sharp from "sharp";

@Injectable()
export class ImageResolutionValidationPipe implements PipeTransform<sharp.Sharp, Promise<sharp.Sharp>> {

  constructor(
    private readonly config: ConfigService
  ) { }

  async transform(value: sharp.Sharp, argumentMetadata: ArgumentMetadata): Promise<sharp.Sharp> {
    const metadata = await value.metadata();
    if (metadata.width > this.config.get('SOURCE_IMAGE_MAX_WIDTH', 20) || metadata.height > this.config.get('SOURCE_IMAGE_MAX_HEIGHT', 20)) {
      throw new BadRequestException("Image size must be <= 20x20px");
    }
    return value;
  }
}