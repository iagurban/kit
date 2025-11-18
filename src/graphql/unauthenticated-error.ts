import { GraphQLError } from 'graphql';

export class UnauthenticatedError extends GraphQLError {
  constructor(message = 'Unauthenticated') {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
  }
}
