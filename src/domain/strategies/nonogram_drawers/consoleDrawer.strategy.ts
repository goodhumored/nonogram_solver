import { ConsoleDrawerSymbols } from "../../enums/consoleDrawerSymbols.enum";
import { TileStateEnum } from "../../enums/tileState.enum";
import { Drawer } from "../../interfaces/drawer.interface";
import { Tile } from "../../interfaces/tile.interface";



export class ConsoleDrawer implements Drawer {
  result = '';

  constructor() {
    this.result = '';
  }

  drawTile(tile: Tile): void {
    if (tile.getState() == TileStateEnum.empty)
      this.result += ConsoleDrawerSymbols.empty
    else if (tile.getState() == TileStateEnum.flagged)
      this.result += ConsoleDrawerSymbols.flagged
    else if (tile.getState() == TileStateEnum.painted)
      this.result += ConsoleDrawerSymbols.painted
    else
      this.result += ConsoleDrawerSymbols.unknown
  }

  finishLine(): void {
    this.result += "\n"
  }

  getResult(): string {
    console.log('\n' + this.result)
    return this.result;
  }
}