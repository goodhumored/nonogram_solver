import { Drawer } from "../interfaces/drawer.interface";
import { Line } from "../interfaces/line.interface";
import { Nonogram } from "../interfaces/nonogram.interface";
import { Solver } from "../interfaces/solver.interface";
import { StandartLine } from "./line.entity";

export class StandartNonogram implements Nonogram {
  private rows: Line[];
  private columns: Line[];


  constructor(rows: Line[], columns: Line[]) {
    this.columns = columns;
    this.rows = rows;
  }

  setSolver(solver: Solver): void {
    for (let rowN = 0; rowN < this.rows.length; rowN++) {
      this.rows[rowN].setSolver(solver);
    }
    for (let colN = 0; colN < this.columns.length; colN++) {
      this.columns[colN].setSolver(solver);
    }
  }

  draw(drawer: Drawer): unknown {
    this.rows[0].draw(drawer)
    for (let rowN = 1; rowN < this.rows.length; rowN++) {
      drawer.finishLine()
      this.rows[rowN].draw(drawer)
    }
    return drawer.getResult();
  }

  getRows(): Line[] {
    return this.rows;
  }

  getColumns(): Line[] {
    return this.columns;
  }

  isSolved(): boolean {
    return this.rows.every(row => row.isClosed());
  }

  solve(): void {
    for (let rowN = 0; rowN < this.getRows().length; rowN++) {
      this.getRows()[rowN].solve();
    }
    for (let colN = 0; colN < this.getColumns().length; colN++) {
      this.getColumns()[colN].solve();
    }
  }

  clone(): StandartNonogram {
    const rows: Line[] = [];
    const cols: Line[] = [];
    for (let colN = 0; colN < this.getColumns().length; colN++) {
      cols.push(new StandartLine(this.getColumns()[colN].getQuantifiers(), []));
    }
    for (let rowN = 0; rowN < this.getRows().length; rowN++) {
      rows.push(this.getRows()[rowN].clone());
      for (let colN = 0; colN < this.getColumns().length; colN++) {
        cols[colN].addTile(rows[rowN].getTile(colN))
      }
    }
    return new StandartNonogram(rows, cols);
  }

  toJSON() {
    return {
      cols: this.getColumns(),
      rows: this.getRows()
    }
  }
}