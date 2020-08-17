import { BusinessException } from "../dtos/business-exception";
import { ExceptionInfo } from "./exception.info";

export interface BusinessExceptionInfo extends ExceptionInfo<BusinessException> {}