import { TileStateEnum } from "../enums/tileState.enum";
import { Clonable } from "./common/clonable.interface";
import { Line } from "./line.interface";

export interface Tile extends Clonable<Tile> {
  getState(): TileStateEnum;
  flag(): void;
  paint(): void;
  getColumn(): Line;
  getRow(): Line;
}