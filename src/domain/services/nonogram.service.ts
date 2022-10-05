import { Injectable } from "@nestjs/common";
import sharp from "sharp";
import { StandartNonogram } from "../entities/nonogram.entity";
import { NonogramFactory } from "../factories/nonogram.factory";
import { Nonogram } from "../interfaces/nonogram.interface";
import { ConsoleDrawer } from "../strategies/nonogram_drawers/consoleDrawer.strategy";

@Injectable()
export class NonogramService {
  constructor() { }

  solveSteps<T extends Nonogram>(nonogram: T, steps: number = 0): T {
    if (steps == 0) steps = 100
    while (!nonogram.isSolved()) {
      if (steps == 0) break;
      steps--;
      nonogram.solve();
    }
    return nonogram;
  }

  async getNonogramByImage(image: sharp.Sharp, width?: number, height?: number): Promise<StandartNonogram> {
    image = await image
      .toColorspace('b-w');
    if (width || height) {
      image = image.resize(+width, +height);
    }
    const metadata = await image.metadata();
    if (!width) width = metadata.width;
    if (!height) height = metadata.height;
    image.jpeg().toFile(`/var/tmp/nonogram/nonogram_${Date.now().toString()}_${width}_${height}.jpg`, err => { if (err) throw err; });
    const { data: buffer } = await image.raw().toBuffer({ resolveWithObject: true });
    return NonogramFactory.fromBuffer(buffer, +width, +height);
  }

  drawNonogram(nonogram: Nonogram): string {
    const drawer = new ConsoleDrawer();
    nonogram.draw(drawer);
    return drawer.getResult();
  }
}