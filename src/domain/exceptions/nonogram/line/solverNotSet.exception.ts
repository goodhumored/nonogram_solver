import { InternalServerErrorException } from "@nestjs/common";

export class SolverNotSetException extends InternalServerErrorException {
  constructor() {
    super(null, "Solver was not set");
  }
}