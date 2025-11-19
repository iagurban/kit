import { observer } from 'mobx-react-lite';
import {
  forwardRef,
  ForwardRefRenderFunction,
  FunctionComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';

/**
 * Enhances a given component with both observer and forwardRef functionality.
 *
 * This function wraps a React component, allowing it to observe and react to
 * changes in MobX observables while also supporting React's `forwardRef` mechanism.
 * It combines the functionalities of `observer` from MobX React and
 * `forwardRef` from React.
 *
 * @template P - The props type of the wrapped component.
 * @template T - The type of the forwarded ref.
 *
 * @param {ForwardRefRenderFunction<T, PropsWithoutRef<P>>} render - The render function defining the
 * component logic, taking props and a ref as arguments.
 * @returns {React.FunctionComponent<P>} A new component that observes MobX state and
 * handles forwarded refs.
 */
export const observerWithForwardRef = <P, T>(
  render: ForwardRefRenderFunction<T, PropsWithoutRef<P>>
): FunctionComponent<PropsWithoutRef<P> & RefAttributes<T>> => observer(forwardRef<T, P>(render));
