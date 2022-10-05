import { Tile } from "./tile.interface";

export interface Drawer {
  drawTile(tile: Tile): void | Promise<void>
  finishLine(): void | Promise<void>
  getResult(): unknown | Promise<unknown>
}