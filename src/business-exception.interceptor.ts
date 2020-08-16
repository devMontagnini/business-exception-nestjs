import { 
  NestInterceptor, 
  CallHandler, 
  Injectable, 
  ExecutionContext, 
  Inject 
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BusinessException } from "./business-exception";
import { BUSINESS_EXCEPTION_CONFIG_TOKEN } from "./constants";
import { BusinessExceptionConfig } from "./business-exception.config";
import { ExceptionInfo } from "./exception-info";

@Injectable()
export class BusinessExceptionInterceptor implements NestInterceptor {

  constructor(
    @Inject(BUSINESS_EXCEPTION_CONFIG_TOKEN)
    private readonly config: BusinessExceptionConfig,
  ) { }

  responseException(error: Error): Error {
    const isBusinessException = error instanceof BusinessException;
    if (isBusinessException && this.config.responseOnBusinessException) {
      return this.config.responseOnBusinessException(
        error as BusinessException
      );
    }
    return error;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((exception: any) => {
        if(this.config.logOnAnyException || this.config.logOnBusinessException) {
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
          this.config?.logOnAnyException(exceptionContent);
          this.config?.logOnBusinessException(
            exceptionContent as ExceptionInfo<BusinessException>
          );
        }
        return throwError(this.responseException(exception));
      }));
  }
}