export type OverrideFields<T, O> = {
  [K in keyof T | keyof O]: K extends keyof O ? O[K] : K extends keyof T ? T[K] : never;
};

export type ValOrArr<T> = T | readonly T[];

export type Nullish = null | undefined;

export type NotNullish<T> = Exclude<T, Nullish>;

export type RequiredKeys<T> = {
  [K in keyof T]: {} extends { [P in K]: T[K] } ? never : K;
}[keyof T];

export type NonOptional<T> = Pick<T, RequiredKeys<T>>;

export type UnwrapArray<T> = T extends (infer R)[] ? R : T;

export type RecordValues<T> = T[keyof T];

export type MutableArray<A> = A extends readonly (infer Q)[] ? Q[] : A;

export type PickUndefinedKeys<T> = { [K in keyof T as T[K] extends undefined ? K : never]: true };

type RecurOrderObj<T, Values> = Record<string, Values | T | undefined>;
export interface IRecurOrderObj<Values> extends RecurOrderObj<IRecurOrderObj<Values>, Values> {}

export type AnyFunction<R = unknown> = (...a: readonly never[]) => R;

export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyAnyFunction<R = any> = (...args: any[]) => R;
