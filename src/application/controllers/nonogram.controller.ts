import { Body, Controller, Post } from "@nestjs/common";
import { Nonogram } from "../../domain/entities/nonogram.entity";
import { NonogramDTOMapper } from "../../domain/pipes/nonogramDTOMapper.pipe";
import { NonogramService } from "../../domain/services/nonogram.service";

@Controller('nonogram')
export class NonogramController {
  constructor(
    private service: NonogramService
  ) { }

  @Post('solve/json')
  solveJSON(@Body(NonogramDTOMapper) nonogram: Nonogram): Nonogram {
    return this.service.solve(nonogram);
  }
}