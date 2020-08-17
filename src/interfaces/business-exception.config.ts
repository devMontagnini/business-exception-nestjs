import { BusinessException } from "../dtos/business-exception";
import { BusinessExceptionInfo } from "./business-exception.info";
import { GenericExceptionInfo } from "./generic-exception.info";

export interface BusinessExceptionConfig {
  responseOnBusinessException?: (businessException: BusinessException) => any,
  logOnBusinessException?: (exceptionInfo: BusinessExceptionInfo) => void,
  logOnAnyException?: (exceptionInfo: GenericExceptionInfo) => void,
}