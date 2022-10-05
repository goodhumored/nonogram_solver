import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import sharp from "sharp";
import { StandartNonogram } from "../../domain/entities/nonogram.entity";
import { MulterToSharpPipe } from "../../domain/pipes/multerToSharp.pipe";
import { NonogramDTOMapper } from "../../domain/pipes/nonogramDTOMapper.pipe";
import { NonogramService } from "../../domain/services/nonogram.service";

@Controller('api/nonogram')
export class NonogramController {
  constructor(
    private service: NonogramService
  ) { }

  //==================================================================================================
  /**
   * Solves passed nonogram as json object and returnes solved version
   * @param nonogram nonogram json to solve
   * @returns solved nonogram
   */
  @Post('solve/json')
  solveJSON(
    @Body(NonogramDTOMapper) nonogram: StandartNonogram,
    @Query('steps') steps?: number
  ): StandartNonogram {
    return this.service.solveSteps(nonogram, steps ? +steps : 0) as StandartNonogram;
  }
  //==================================================================================================
  /**
   * Makes solvable nonogram json from image
   * @param image image file
   * @param width optional width to resize file
   * @param height optional height to resize file
   * @returns nonogram
   */
  @UseInterceptors(FileInterceptor('file'))
  @Post('from/image')
  async getNonogramByImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000 }),
          new FileTypeValidator({ fileType: /(jpe?g|png)/ })
        ]
      }),
      MulterToSharpPipe
    ) image: sharp.Sharp,
    @Query('width') width?: number,
    @Query('height') height?: number
  ): Promise<StandartNonogram> {
    return this.service.getNonogramByImage(image, width, height);
  }
  //==================================================================================================
  @Post('draw/ascii')
  drawNonogram(@Body(NonogramDTOMapper) nonogram: StandartNonogram): string {
    return this.service.drawNonogram(nonogram);
  }
}