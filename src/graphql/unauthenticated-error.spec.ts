import { GraphQLError } from 'graphql';

import { UnauthenticatedError } from './unauthenticated-error';

describe('UnauthenticatedError', () => {
  it('should be an instance of UnauthenticatedError', () => {
    const error = new UnauthenticatedError();
    expect(error).toBeInstanceOf(UnauthenticatedError);
  });

  it('should be an instance of GraphQLError', () => {
    const error = new UnauthenticatedError();
    expect(error).toBeInstanceOf(GraphQLError);
  });

  it('should have a default message of "Unauthenticated" if none is provided', () => {
    const error = new UnauthenticatedError();
    expect(error.message).toBe('Unauthenticated');
  });

  it('should use the provided message if one is given', () => {
    const customMessage = 'User is not logged in';
    const error = new UnauthenticatedError(customMessage);
    expect(error.message).toBe(customMessage);
  });

  it('should have an extensions code of "UNAUTHENTICATED"', () => {
    const error = new UnauthenticatedError();
    expect(error.extensions?.code).toBe('UNAUTHENTICATED');
  });
});
