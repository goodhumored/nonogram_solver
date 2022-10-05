import { TileStateEnum } from "../enums/tileState.enum";
import { Line } from "../interfaces/line.interface";
import { Tile } from "../interfaces/tile.interface";

export class StandartTile implements Tile {

  private state: TileStateEnum = TileStateEnum.empty;
  private row: Line;
  private column: Line;

  
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

  getColumn(): Line {
    return this.column;
  }

  getRow(): Line {
    return this.row;
  }

  setColumn(column: Line): void {
    this.column = column;
  }

  setRow(row: Line): void {
    this.row = row;
  }

  clone(): StandartTile {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}