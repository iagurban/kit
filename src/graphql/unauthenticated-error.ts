import { GraphQLError } from 'graphql';

/**
 * An error that is thrown when a user is not authenticated.
 */
export class UnauthenticatedError extends GraphQLError {
  /**
   * Creates a new UnauthenticatedError.
   * @param message The error message.
   */
  constructor(message = 'Unauthenticated') {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}
