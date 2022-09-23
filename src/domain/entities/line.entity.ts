import { ILine } from "../interfaces/line.interface";
import { ITile } from "../interfaces/tile.interface";

export class Line implements ILine {
  private tiles: ITile[];
  private quantifiers: number[];
  private closed: boolean;

  constructor(quantifiers: number[], tiles?: ITile[]) {
    this.quantifiers = quantifiers
    this.tiles = tiles
  }

  getTiles(): ITile[] {
    return this.tiles;
  }

  getTile(n: number): ITile {
    return this.tiles[n];
  }

  addTile(tile: ITile): void {
    this.tiles.push(tile);
  }

  isClosed(): boolean {
    return this.closed
  }

  close(): void {
    this.closed = true;
  }

  modifyProbabilities(): void {
    for (let quantifiersN = 0; quantifiersN < .length; quantifiersN++) {
      const element = [quantifiersN];
      
    }
  }
  
  paintProbabilities(): void {
    const tiles = this.getTiles();
    for (let tileN = 0; tileN < tiles.length; tileN++) {
      if (tiles[tileN].getProbability() == tiles.length)
        tiles[tileN].paint()
    }
  }
}