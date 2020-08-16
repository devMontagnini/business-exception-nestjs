export interface ExceptionInfo<T> {
  exception: T;
  request: {
    url: string,
    method: string,
    headers: any,
    body: any
  }
}