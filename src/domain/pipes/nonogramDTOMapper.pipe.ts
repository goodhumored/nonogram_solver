import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { NonogramDTO } from "../../application/dtos/nonogram.dto";
import { StandartLine } from "../entities/line.entity";
import { StandartNonogram } from "../entities/nonogram.entity";
import { StandartTile } from "../entities/tile.entity";
import { TileStateEnum } from "../enums/tileState.enum";
import { Line } from "../interfaces/line.interface";

export class NonogramDTOMapper implements PipeTransform {
  transform(value: NonogramDTO, metadata: ArgumentMetadata): StandartNonogram {
    const rows: Line[] = [];
    const cols: Line[] = [];
    for (let rowN = 0; rowN < value.rows.length; rowN++) {
      const row = new StandartLine(value.rows[rowN].quantifiers);
      for (let colN = 0; colN < value.cols.length; colN++) {
        let col;
        if (cols[colN]) {
          col = cols[colN]
        } else {
          col = new StandartLine(value.cols[colN].quantifiers);
          cols.push(col);
        }
        let tileState;
        if (value.rows[rowN].tiles) tileState = value.rows[rowN].tiles[colN]?.state;
        else if (value.cols[colN].tiles) tileState = value.cols[colN].tiles[rowN]?.state;
        const tile = new StandartTile(tileState ?? TileStateEnum.empty);
        row.addTile(tile);
        col.addTile(tile);
      }
      rows.push(row);
    }
    return new StandartNonogram(rows, cols);
  }
}