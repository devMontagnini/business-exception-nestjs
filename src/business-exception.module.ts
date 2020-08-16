import { Module, DynamicModule } from "@nestjs/common";
import { BusinessExceptionInterceptor } from "./business-exception.interceptor";
import { BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN } from "./constants";
import { BusinessExceptionConfig } from "./business-exception.config";
import { BusinessExceptionConfigAsync } from "./business-exception.config.async";
import { BusinessExceptionHostModule } from "./business-exception-host.module";

@Module({
  providers: [{
    provide: BusinessExceptionInterceptor,
    useExisting: BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN,
  }],
  exports: [BusinessExceptionInterceptor]
})
export class BusinessExceptionModule { 
  
  static forRoot(config: BusinessExceptionConfig): DynamicModule {
    return {
      module: BusinessExceptionModule,
      imports: [BusinessExceptionHostModule.forRoot(config)],
    }
  }

  static forRootAsync(config: BusinessExceptionConfigAsync): DynamicModule {
    return {
      module: BusinessExceptionModule,
      imports: [BusinessExceptionHostModule.forRootAsync(config)],
    }
  }

}