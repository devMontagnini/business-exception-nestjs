export class BusinessException extends Error {
  constructor(
    public readonly code: string,
    public readonly codeParams?: { [key: string]: string }
  ) {
    super();
  }
}