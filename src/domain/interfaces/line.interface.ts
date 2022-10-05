import { Clonable } from "./common/clonable.interface";
import { Drawer } from "./drawer.interface";
import { Solver } from "./solver.interface";
import { Tile } from "./tile.interface";

export interface Line extends Clonable<Line> {
  getTiles(): Tile[];
  getTile(n: number): Tile;
  addTile(tile: Tile): void;
  getQuantifiers(): number[];
  isClosed(): boolean;
  close(): void;
  solve(): void;
  setSolver(solver: Solver): void;
  draw(drawer: Drawer): void;
}