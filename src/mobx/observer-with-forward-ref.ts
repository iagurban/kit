import { observer } from 'mobx-react-lite';
import { forwardRef, ForwardRefRenderFunction, PropsWithoutRef } from 'react';

export const observerWithForwardRef = <P, T>(render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>) =>
  observer(forwardRef<T, P>(render));
