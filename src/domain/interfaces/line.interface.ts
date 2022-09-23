import { ITile } from "./tile.interface";

export interface ILine {
  getTiles(): ITile[];
  getTile(n: number): ITile;
  addTile(tile: ITile): void;
  isClosed(): boolean;
  close(): void;
  modifyProbabilities(): void;
  paintProbabilities(): void;
}