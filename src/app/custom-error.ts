export class CustomError extends Error {
  errCode: string;

  constructor(errCode: string) {
    super();
    this.errCode = errCode;
  }
}
