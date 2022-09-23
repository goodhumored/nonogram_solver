import { TileStateEnum } from "../enums/tileState.enum";
import { ILine } from "./line.interface";

export type ProbabilityType = number;

export interface ITile {
  getState(): TileStateEnum;
  flag(): void;
  paint(): void;
  getColumn(): ILine;
  getRow(): ILine;
  getProbability(): ProbabilityType;
  setProbability(probability: ProbabilityType): void;
  incrementProbability(): void;
}