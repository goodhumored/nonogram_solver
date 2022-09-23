import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { NonogramDTO } from "../../application/dtos/nonogram.dto";
import { Line } from "../entities/line.entity";
import { Nonogram } from "../entities/nonogram.entity";
import { Tile } from "../entities/tile.entity";
import { TileStateEnum } from "../enums/tileState.enum";
import { ILine } from "../interfaces/line.interface";

export class NonogramDTOMapper implements PipeTransform {
  transform(value: NonogramDTO, metadata: ArgumentMetadata): Nonogram {
    const rows: ILine[] = [];
    const cols: ILine[] = [];
    for (let rowN = 0; rowN < value.rows.length; rowN++) {
      const row = new Line(value.rows[rowN].quantifiers);
      for (let colN = 0; colN < value.cols.length; colN++) {
        const col = new Line(value.cols[colN].quantifiers);
        const state: TileStateEnum = (value.rows[rowN].tiles[colN] ?? value.cols[colN].tiles[rowN]).state
        const tile = new Tile(state);
        row.addTile(tile)
        col.addTile(tile)
        cols.push(col)
      }
      rows.push(row);
    }
    return new Nonogram(rows, cols)
  }
}