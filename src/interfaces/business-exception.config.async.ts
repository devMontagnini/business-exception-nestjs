import { ModuleMetadata, FactoryProvider } from "@nestjs/common/interfaces";
import { BusinessExceptionConfig } from "./business-exception.config";

export interface BusinessExceptionConfigAsync extends Pick<ModuleMetadata, 'imports'>, Pick<FactoryProvider, 'inject'> {
  useFactory: (...args: any[]) => Promise<BusinessExceptionConfig> | BusinessExceptionConfig;
}