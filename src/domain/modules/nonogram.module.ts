import { Module } from "@nestjs/common";
import { NonogramController } from "../../application/controllers/nonogram.controller";
import { NonogramService } from "../services/nonogram.service";

@Module({
  controllers: [NonogramController],
  providers: [NonogramService]
})
export class NonogramModule { }