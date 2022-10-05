import { Clonable } from "./common/clonable.interface";
import { Drawer } from "./drawer.interface";
import { Line } from "./line.interface";
import { Solver } from "./solver.interface";

export interface Nonogram extends Clonable<Nonogram> {
  getRows(): Line[];
  getColumns(): Line[];
  isSolved(): boolean;
  solve(): void;
  setSolver(solver: Solver): void;
  draw(drawer: Drawer): unknown;
}