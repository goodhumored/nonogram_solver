import { ILine } from "../interfaces/line.interface";
import { INonogram } from "../interfaces/nonogram.interface";

export class Nonogram implements INonogram {
  private rows: ILine[];
  private columns: ILine[];


  constructor(rows: ILine[], columns: ILine[]) {
    this.columns = columns
    this.rows = rows
  }

  getRows(): ILine[] {
    return this.rows;
  }

  getColumns(): ILine[] {
    return this.columns;
  }

  isSolved(): boolean {
    return this.rows.every(row => row.isClosed())
  }

  modifyProbabilities(): void {
    const rows = this.getRows();
    for (let rowN = 0; rowN < rows.length; rowN++)
      rows[rowN].modifyProbabilities()
    const cols = this.getColumns();
    for (let colN = 0; colN < cols.length; colN++)
      cols[colN].modifyProbabilities()
  }

  paintProbabilities(): void {
    const rows = this.getRows();
    for (let rowN = 0; rowN < rows.length; rowN++)
      rows[rowN].paintProbabilities()
  }
}