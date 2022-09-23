import { Injectable } from "@nestjs/common";
import { Nonogram } from "../entities/nonogram.entity";

@Injectable()
export class NonogramService {
  constructor() { }

  solve(nonogram: Nonogram): Nonogram {
    while (!nonogram.isSolved()) {
      nonogram.modifyProbabilities();
      nonogram.paintProbabilities();
    }
    return nonogram;
  }
}