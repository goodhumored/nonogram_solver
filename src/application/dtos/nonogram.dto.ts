import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsNumberString, ValidateNested } from "class-validator";
import { TileStateEnum } from "../../domain/enums/tileState.enum";

class TileDTO {
  @IsEnum(TileStateEnum)
  state: TileStateEnum;
}

class LineDTO {
  @IsNumber({
    allowInfinity: false,
    allowNaN: false
  }, { each: true })
  quantifiers: number[];

  @ValidateNested({ each: true })
  tiles: TileDTO[];
}

export class NonogramDTO {
  @ValidateNested({ each: true })
  @Type(() => LineDTO)
  readonly rows: LineDTO[];

  @ValidateNested({ each: true })
  @Type(() => LineDTO)
  readonly cols: LineDTO[];
}