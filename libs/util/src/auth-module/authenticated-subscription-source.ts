/**
 * Builds a factory for authenticated subscription sources.
 *
 * The returned method, when first iterated (first `next()` call), will:
 * 1. Invoke `accessTokenToPayload(this, accessToken)` exactly once to obtain
 *    the user payload (type `JWTPayload`). If it throws, the rejection is
 *    surfaced as a GraphQL subscription error.
 * 2. Call `iterableGetter(this, user, ...args)` to obtain the real event stream.
 * 3. Forward all items from that AsyncIterable to the client.
 *
 * **IMPORTANT: ** The returned function **must** be called with the correct `this`
 * context—either as a method (`this.mySource(token, ...)`) or via
 * `.call(this, token, ...)`.
 *
 * @template This      – the resolver class type (the `this` context)
 * @template Return    – the type of items emitted by the AsyncIterator
 * @template Args      – a tuple type of extra arguments after the token
 * @template JWTPayload– the result type of `accessTokenToPayload`
 *
 * @param accessTokenToPayload
 *   A function `(resolverInstance: This, token: string) => JWTPayload` that
 *   verifies the token and returns a user payload.
 *
 * @param iterableGetter
 *   A function `(resolverInstance: This, user: JWTPayload, ...args: Args) => AsyncIterable<Return>`
 *   that produces the underlying AsyncIterable once the user is validated.
 *
 * @returns
 *   A method `(this: This, accessToken: string, ...args: Args) => AsyncIterator<Return>`
 *   that must be invoked with the correct `this` context.
 */
export function authenticatedSubscriptionSource<This, Return, Args extends readonly unknown[], JWTPayload>(
  accessTokenToPayload: (resolverInstance: This, token: string) => JWTPayload,
  iterableGetter: (resolverInstance: This, user: JWTPayload, ...args: Args) => AsyncIterable<Return>
): (this: This, accessToken: string, ...args: Args) => AsyncIterator<Return> {
  return function (this: This, accessToken: string, ...args: Args): AsyncIterator<Return> {
    return async function* (this: This) {
      const user = accessTokenToPayload(this, accessToken);
      const base = iterableGetter(this, user, ...args);
      // прокидываем события дальше
      for await (const v of base) {
        yield v;
      }
    }.call(this);
  };
}

type WithAuthService = { authService: { accessTokenToPayload: (token: string) => unknown } };
type ConversionReturn<R extends WithAuthService> = ReturnType<R[`authService`][`accessTokenToPayload`]>;

/**
 * A standard specialization for resolvers that expose an `authService`
 * with an `accessTokenToPayload(token)` method.
 *
 * @template This    – your resolver class; must have `authService.accessTokenToPayload`
 * @template Return  – the type of each yielded value
 * @template Args    – a tuple type of extra arguments after the token
 *
 * @param iterableGetter
 *   A function `(resolverInstance: This, user: ConversionReturn<This>, ...args: Args) => AsyncIterable<Return>`
 *   that produces the actual AsyncIterable given a validated user.
 *
 * @returns
 *   A method `(this: This, accessToken: string, ...args: Args) => AsyncIterator<Return>`
 *   which validates via `authService.accessTokenToPayload` and then delegates
 *   to your iterableGetter.
 */
export function standardAuthenticatedSubscriptionSource<
  This extends WithAuthService,
  Return,
  Args extends readonly unknown[],
>(
  iterableGetter: (
    resolverInstance: This,
    user: ConversionReturn<This>,
    ...args: Args
  ) => AsyncIterable<Return>
): (this: This, accessToken: string, ...args: Args) => AsyncIterator<Return> {
  return authenticatedSubscriptionSource<This, Return, Args, ConversionReturn<This>>(
    (o, token) => o.authService.accessTokenToPayload(token) as ConversionReturn<This>,
    iterableGetter
  );
}
