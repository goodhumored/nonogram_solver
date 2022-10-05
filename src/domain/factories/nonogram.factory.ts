import { StandartLine } from "../entities/line.entity";
import { StandartNonogram } from "../entities/nonogram.entity";
import { Line } from "../interfaces/line.interface";

export class NonogramFactory {

  static isBlack = (value: number) => value <= 128;

  static fromBuffer(buffer: Buffer, width: number, height: number): StandartNonogram {
    const cols: Line[] = [];
    const rows: Line[] = [];

    let line = new Array(width).fill(0);
    const cols_quantifiers = new Array(width).fill(null).map(e => []);
    for (let y = 0; y < height; y++) {
      const line_quantifiers = [];
      let q = 0;
      for (let x = 0; x < width; x++) {
        if (this.isBlack(buffer[y * height + x])) {
          q++;
          line[x]++;
        } else {
          if (q > 0) {
            line_quantifiers.push(q);
            q = 0;
          }
          if (line[x] > 0) {
            cols_quantifiers[x].push(line[x]);
            line[x] = 0;
          }
        }
      }
      if (q > 0) {
        line_quantifiers.push(q);
      }
      q = 0;
      rows.push(new StandartLine(line_quantifiers));
    }
    for (let colN = 0; colN < cols_quantifiers.length; colN++) {
      if (line[colN] > 0) {
        cols_quantifiers[colN].push(line[colN]);
      }
      cols.push(new StandartLine(cols_quantifiers[colN]));
    }
    return new StandartNonogram(rows, cols);
  }
}