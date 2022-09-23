import { TileStateEnum } from "../enums/tileState.enum";
import { ILine } from "../interfaces/line.interface";
import { ITile, ProbabilityType } from "../interfaces/tile.interface";

export class Tile implements ITile {

  private state: TileStateEnum = TileStateEnum.unknown;
  private row: ILine;
  private column: ILine;
  private probability: ProbabilityType;

  
  constructor(state?: TileStateEnum) {
    this.state = state;
  }

  getState(): TileStateEnum {
    return this.state;
  }

  flag(): void {
    this.state = TileStateEnum.flagged;
  }

  paint(): void {
    this.state = TileStateEnum.painted;
  }

  getColumn(): ILine {
    return this.column;
  }

  getRow(): ILine {
    return this.row;
  }

  setColumn(column: ILine): void {
    this.column = column;
  }

  setRow(row: ILine): void {
    this.row = row;
  }
  
  getProbability(): ProbabilityType {
    return this.probability;
  }

  setProbability(probability: ProbabilityType): void {
    this.probability = probability;
  }

  incrementProbability(): void {
    this.probability++;
  }
}