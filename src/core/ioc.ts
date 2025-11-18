export enum ServiceState {
  None,
  Creating,
  Created,
}

/**
 * A factory function to create an Inversion of Control (IoC) container.
 *
 * This IoC container allows for managing dependencies by dynamically instantiating services
 * and ensuring proper resolution of their dependencies. Services can be defined as part
 * of the input schema, and their implementations can be registered into the container.
 *
 * The container prevents redefinition of service implementations after they have been
 * instantiated and immediately throws an error in cases of cyclic dependencies or
 * accessing unregistered services.
 *
 * @template T - The type definition of the IoC container, representing services and their types.
 *
 * @param {object} schema - A schema object defining the service keys the container will manage.
 * Each key is set to `null` to establish the potential for registering an implementation.
 *
 * @returns {object} An object containing:
 * - `container`: The IoC container instance that provides resolved implementations of the services.
 * - `implementations`: A proxy object allowing for the registration of service implementations.
 *
 * @throws {Error} If a service implementation is accessed without being registered.
 * @throws {Error} If an implementation of a service is set after the service has been instantiated.
 * @throws {Error} If a cyclic dependency is detected when resolving a service.
 */
export const createIoCContainer = <T extends Record<string, unknown>>(schema: {
  [K in keyof T]: null;
}): { container: T; implementations: { [K in keyof T]: (container: T) => T[K] } } => {
  const container: T = {} as T;
  const states: { [key: string]: ServiceState | undefined } = {};
  const fabrics: { [key: string]: ((container: T) => unknown) | undefined } = {};
  const fabricsProxy = {} as {
    [K in keyof T]: (container: T) => T[K];
  };

  for (const key of Object.keys(schema)) {
    Object.defineProperty(fabricsProxy, key, {
      get() {
        return fabrics[key];
      },
      set(v) {
        if (states[key]) {
          throw new Error(`can't set implementation of ${key} after it has been instantiated`);
        }
        fabrics[key] = v;
      },
    });

    Object.defineProperty(container, key, {
      get() {
        const cls = fabrics[key];
        if (!cls) {
          throw new Error(`service implementation ${key} not registered`);
        }
        switch (states[key]) {
          case ServiceState.Creating: {
            throw new Error(`cyclic dependency on getting ${key} service`);
          }
          case ServiceState.Created: {
            throw new Error(`programmer error`);
          }
          default: {
            states[key] = ServiceState.Creating;
            try {
              const impl = cls(container);
              Object.defineProperty(this, key, {
                value: impl,
                writable: false,
                configurable: false,
                enumerable: true,
              });
              states[key] = ServiceState.Created;
              return impl;
            } catch (error) {
              delete states[key];
              throw error;
            }
          }
        }
      },
      configurable: true,
      enumerable: true,
    });
  }

  return { container, implementations: fabricsProxy };
};
