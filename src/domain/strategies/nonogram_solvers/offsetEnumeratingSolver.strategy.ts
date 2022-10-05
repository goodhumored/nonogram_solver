import { TileStateEnum } from "../../enums/tileState.enum";
import { Line } from "../../interfaces/line.interface";
import { Solver } from "../../interfaces/solver.interface";

export class OffsetEnumeratingSolver implements Solver {

  private max_offset: number;
  private quantifiers: number[];
  private tileCounters: number[];
  private variationsCount: number;
  private originalLine: Line;

  solve(line: Line): Line {
    this.variationsCount = 0;
    this.originalLine = line;
    this.quantifiers = this.originalLine.getQuantifiers();

    this.max_offset = this.originalLine.getTiles().length - this.quantifiers.reduce((a, b) => a + b, 0) - this.quantifiers.length + 1;
    const max_quant = this.quantifiers.reduce((a, b) => Math.max(a, b), 0);
    if (max_quant < this.max_offset && line.getTiles().every(t => t.getState() == TileStateEnum.empty)) return line;
    this.tileCounters = new Array(this.originalLine.getTiles().length).fill(0);
    const offsets = new Array(this.quantifiers.length).fill(0);
    this.proccessOffsets(offsets);
    this.enumerateOffsets(offsets, this.quantifiers.length - 1);

    for (let counterN = 0; counterN < this.tileCounters.length; counterN++) {
      if (this.tileCounters[counterN] == this.variationsCount) {
        this.originalLine.getTile(counterN).paint();
      }
      else if (this.tileCounters[counterN] == 0) {
        this.originalLine.getTile(counterN).flag();
      }
    }
    return this.originalLine;
  }

  private enumerateOffsets(offsets: number[], offset_i: number) {
    const offsets_copy = [...offsets];
    if (offset_i == offsets.length - 1) {
      if (offsets_copy[offset_i] == this.max_offset) return;
    } else if (offsets_copy[offset_i] == offsets_copy[offset_i + 1]) {
      return;
    }
    offsets_copy[offset_i] += 1;

    this.proccessOffsets(offsets_copy);

    if (offset_i != 0) {
      this.enumerateOffsets(offsets_copy, offset_i - 1);
    }
    this.enumerateOffsets(offsets_copy, offset_i);
  }

  private proccessOffsets(offsets: number[]): void {
    const lineCopy: Line = this.originalLine.clone();
    let position = 0;
    for (let offsetN = 0; offsetN < offsets.length; offsetN++) {
      for (let i = 0; i < this.quantifiers[offsetN]; i++) {
        lineCopy.getTile(position + offsets[offsetN]).paint();
        position++;
      }
      position++;
    }
    if (this.validateLine(lineCopy)) {
      this.variationsCount++;
      const tilesCopy = lineCopy.getTiles();
      for (let i = 0; i < tilesCopy.length; i++) {
        if (lineCopy.getTile(i).getState() == TileStateEnum.painted) {
          this.tileCounters[i]++;
        }
      }
    }
  }

  private validateLine(line: Line): boolean {
    let counter = 0;
    let quantifier_i = 0;
    const lineTiles = line.getTiles();
    for (let i = 0; i < lineTiles.length; i++) {
      if (
        this.originalLine.getTile(i).getState() == TileStateEnum.painted &&
        line.getTile(i).getState() == TileStateEnum.empty
      ) return false;
      if (
        this.originalLine.getTile(i).getState() == TileStateEnum.flagged &&
        line.getTile(i).getState() == TileStateEnum.painted
      ) return false;
      if (line.getTile(i).getState() == TileStateEnum.painted) counter += 1;
      else if (counter !== 0) {
        if (this.quantifiers[quantifier_i] != counter) return false;
        counter = 0;
        quantifier_i++;
      }
    }
    if (counter && (this.quantifiers[quantifier_i] != counter)) return false;
    return true;
  }
}