const lazyValuesSymbol: unique symbol = Symbol('lazyValuesSymbol');

type This = { [lazyValuesSymbol]?: Record<string, unknown> };

export const lazyGetter =
  ({ setter }: { setter?: boolean } = {}) =>
  <U, T>(target: U, key: string, { get, set }: TypedPropertyDescriptor<T>) => {
    if (!get) {
      throw new Error(`lazyGetter applied not to class getter`);
    }

    if (set) {
      throw new Error(`lazyGetter can not be applied to getters with setters`);
    }

    return {
      get(this: U & This) {
        const o = this[lazyValuesSymbol];

        if (!o) {
          const v = get.call(this);
          this[lazyValuesSymbol] = { [key]: v };
          return v;
        }

        return key in o ? o[key] : (o[key] = get.call(this));
      },
      set: setter
        ? function (this: U & This, v: T) {
            const o = this[lazyValuesSymbol];

            if (o) {
              o[key] = v;
            } else {
              this[lazyValuesSymbol] = { [key]: v };
            }
          }
        : undefined,
      enumerable: true,
    } as TypedPropertyDescriptor<T>;
  };
