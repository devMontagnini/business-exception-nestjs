import { ExceptionInfo } from "./exception-info";
import { BusinessException } from "./business-exception";

export interface BusinessExceptionConfig {
  responseOnBusinessException?: (businessException: BusinessException) => any,
  logOnBusinessException?: (exceptionInfo: ExceptionInfo<BusinessException>) => void,
  logOnAnyException?: (exceptionInfo: ExceptionInfo<Error>) => void,
}