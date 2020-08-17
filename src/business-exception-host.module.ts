import { BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN,  BUSINESS_EXCEPTION_CONFIG_TOKEN } from "./constants";
import { Module, DynamicModule, Global } from "@nestjs/common";
import { BusinessExceptionConfig } from "./interfaces/business-exception.config";
import { BusinessExceptionConfigAsync } from "./interfaces/business-exception.config.async";
import { BusinessExceptionInterceptor } from "./interceptors/business-exception.interceptor";

@Global()
@Module({
  providers: [{
    provide: BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN,
    useClass: BusinessExceptionInterceptor
  }],
  exports: [BUSINESS_EXCEPTION_CONFIG_TOKEN, BUSINESS_EXCEPTION_INTERCEPTOR_TOKEN]
})
export class BusinessExceptionHostModule { 

  static forRoot(config: BusinessExceptionConfig): DynamicModule {
    return {
      module: BusinessExceptionHostModule,
      providers: [{
        provide: BUSINESS_EXCEPTION_CONFIG_TOKEN,
        useValue: config
      }]
    }
  }

  static forRootAsync(config: BusinessExceptionConfigAsync): DynamicModule {
    return {
      module: BusinessExceptionHostModule,
      imports: config.imports,
      providers: [{
        provide: BUSINESS_EXCEPTION_CONFIG_TOKEN,
        useFactory: config?.useFactory,
        inject: config?.inject,
      }],
    }
  }

}