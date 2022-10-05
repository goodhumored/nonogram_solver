import { SolverNotSetException } from "../exceptions/nonogram/line/solverNotSet.exception";
import { OffsetEnumeratingSolver } from "../strategies/nonogram_solvers/offsetEnumeratingSolver.strategy";
import { Drawer } from "../interfaces/drawer.interface";
import { Line } from "../interfaces/line.interface";
import { Solver } from "../interfaces/solver.interface";
import { Tile } from "../interfaces/tile.interface";
import { TileStateEnum } from "../enums/tileState.enum";

export class StandartLine implements Line {
  private tiles: Tile[];
  private quantifiers: number[];
  private closed: boolean;
  private solver: Solver = new OffsetEnumeratingSolver();

  constructor(quantifiers: number[], tiles: Tile[] = []) {
    this.quantifiers = quantifiers
    this.tiles = tiles
  }

  getTiles(): Tile[] {
    return this.tiles;
  }

  getTile(n: number): Tile {
    return this.tiles[n];
  }

  addTile(tile: Tile): void {
    this.tiles.push(tile);
  }

  isClosed(): boolean {
    return this.closed
  }

  getQuantifiers(): number[] {
    return this.quantifiers;
  }

  close(): void {
    this.closed = true;
  }

  solve(): void {
    if (!this.solver) throw new SolverNotSetException();
    if (this.isClosed()) return;
    this.solver.solve(this);
    if (this.tiles.findIndex(tile => tile.getState() == TileStateEnum.empty) == -1)
      this.close()
  }

  setSolver(solver: Solver): void {
    this.solver = solver;
  }

  draw(drawer: Drawer): void {
    for (let i = 0; i < this.getTiles().length; i++) {
      drawer.drawTile(this.getTile(i).clone())
    }
  }

  clone(): StandartLine {
    const tiles: Tile[] = [];
    for (let i = 0; i < this.getTiles().length; i++) {
      tiles.push(this.getTile(i).clone())
    }
    return new StandartLine(this.quantifiers, tiles);
  }

  toJSON() {
    return {
      tiles: this.tiles,
      quantifiers: this.quantifiers
    }
  }
}