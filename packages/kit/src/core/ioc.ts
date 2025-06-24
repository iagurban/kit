enum ServiceState {
  None,
  Creating,
  Created,
}

export const createIoCContainer = <T extends Record<string, unknown>>(schema: {
  [K in keyof T]: null;
}) => {
  const container: T = {} as T;
  const states: { [key: string]: ServiceState | undefined } = {};
  const fabrics: { [key: string]: ((container: T) => unknown) | undefined } = {};
  const fabricsProxy = {} as {
    [K in keyof T]: ((container: T) => T[K]) | undefined;
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
