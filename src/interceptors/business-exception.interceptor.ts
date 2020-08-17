import { 
  NestInterceptor, 
  CallHandler, 
  Injectable, 
  ExecutionContext, 
  Inject, 
  BadRequestException
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BusinessException } from "../dtos/business-exception";
import { BUSINESS_EXCEPTION_CONFIG_TOKEN } from "../constants";
import { BusinessExceptionConfig } from "../interfaces/business-exception.config";
import { ExceptionInfo } from "../interfaces/exception.info";

@Injectable()
export class BusinessExceptionInterceptor implements NestInterceptor {

  constructor(
    @Inject(BUSINESS_EXCEPTION_CONFIG_TOKEN)
    private readonly config: BusinessExceptionConfig,
  ) { }

  responseException(exception: Error): Error {
    if (exception instanceof BusinessException && this.config.responseOnBusinessException) {
      const responseBody = this.config.responseOnBusinessException(exception);
      return new BadRequestException(responseBody);
    }
    return exception;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((exception: any) => {
        if(this.config?.logOnAnyException || this.config?.logOnBusinessException) {
          const request = context.switchToHttp().getRequest();
          const exceptionContent: ExceptionInfo<any> = {
            exception,
            request: {
              url: `${request.protocol}://${request.hostname}${request.originalUrl}`,
              method: request.method,
              headers: request.headers,
              body: request.body
            }
          };
          if(this.config.logOnAnyException) {
            this.config?.logOnAnyException(exceptionContent);
          }
          if(exception instanceof BusinessException && this.config.logOnBusinessException) {
            this.config?.logOnBusinessException(exceptionContent);
          }
        }
        return throwError(this.responseException(exception));
      }));
  }
}