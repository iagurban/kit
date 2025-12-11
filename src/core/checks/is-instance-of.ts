import { ClassConstructor } from '../types';
import { isTruthy } from './basic';
import { Checker, tagCheckerGetter } from './util';

/**
 * A utility function to check if a given object is an instance of one or more specified classes.
 *
 * @template C The type representing the class or classes to check against.
 * @param {...{new (...args: any[]): C}[]} classes - A list of class constructors to check the object instance against.
 * @returns {(o: unknown) => o is C} A type guard function that takes an object and determines if it is an instance of any of the provided classes.
 */
export const isInstanceOf = <C>(...classes: ClassConstructor<C>[]): Checker<C> =>
  tagCheckerGetter(
    (o): o is C => {
      for (const c of classes) {
        if (o instanceof c) {
          return true;
        }
      }
      return false;
    },
    () => `[${classes.map(c => [`class`, c.name].filter(isTruthy).join(` `)).join(` | `)}]`
  );
