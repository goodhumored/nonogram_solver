import { Line } from "./line.interface";

export interface Solver {
  solve(line: Line): Promise<Line> | Line;
}