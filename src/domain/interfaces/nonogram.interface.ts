import { ILine } from "./line.interface";

export interface INonogram {
  getRows(): ILine[];
  getColumns(): ILine[];
  isSolved(): boolean;
  modifyProbabilities(): void;
  paintProbabilities(): void;
}