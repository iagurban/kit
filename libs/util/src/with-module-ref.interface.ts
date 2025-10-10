import { ModuleRef } from '@nestjs/core';

/**
 * An interface that, when implemented by a service, provides access to the ModuleRef.
 * This is required for the discovery service to dynamically resolve provider instances.
 */
export interface IWithModuleRef {
  /**
   * The ModuleRef instance will be automatically assigned to this property.
   */
  moduleRef: ModuleRef;
}
