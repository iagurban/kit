import { writeFileSync } from 'node:fs';
import { IncomingHttpHeaders } from 'node:http';

import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GraphQLDataSourceProcessOptions } from '@apollo/gateway/src/datasources/types';
import { errorFromUnknown } from '@gurban/kit/utils/error-utils';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLException } from '@nestjs/graphql/dist/exceptions';
import { AuthService } from '@poslah/util/modules/auth-module/auth.service';
import { AuthStaticModule } from '@poslah/util/ready-modules/auth-static-module';
import { rootImports } from '@poslah/util/root-imports';
import { GraphQLError, parse } from 'graphql';
import { join } from 'path';

const writeSdlToFile = (path: string, sdl: string) => {
  // console.log(`writing sdl to ${path}`);
  writeFileSync(path, sdl);
};

const publicGraphqlQueryFieldsSet = new Set([
  // An explicit list of operations that are public and do not require authentication.
  '__schema', // allow introspection
]);

const isAnonymousRequestAllowed = (query?: string): boolean => {
  if (!query) {
    return false;
  }

  try {
    const ast = parse(query);

    let hasAllowed = false; // Tracks if we found at least one valid operation

    for (const definition of ast.definitions) {
      if (definition.kind !== 'OperationDefinition') {
        continue; // Skip fragments definitions and other declarations
      }

      if (!['query', 'subscription'].includes(definition.operation.toLowerCase())) {
        return false; // REJECT if it's e.g. a mutation.
      }

      const disallowed = definition.selectionSet.selections.some(
        s =>
          s.kind !== 'Field' || // REJECT fragments and other stuff
          !publicGraphqlQueryFieldsSet.has(s.name.value) // REJECT non-public fields
      );
      if (disallowed) {
        return false; // This operation is not allowed, so the whole request is rejected.
      }
      hasAllowed = true; // If we get here, this operation was valid.
    }

    return hasAllowed; // Return true only if we found at least one valid operation AND no invalid ones.
  } catch (error) {
    if (error instanceof GraphQLError) {
      return false; // malformed query
    }
    throw error;
  }
};

@Module({})
export class GraphqlAppModule {
  static forRoot(supergraphSdl: string): DynamicModule {
    writeSdlToFile(join(process.cwd(), '../../schema.graphql'), supergraphSdl);

    return {
      module: GraphqlAppModule,
      imports: [
        ...rootImports(`gate-graphql-app`, `gate-graphql`),
        GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
          driver: ApolloGatewayDriver,
          imports: [AuthStaticModule],
          inject: [ConfigService, AuthService],
          useFactory: (configService: ConfigService, authService: AuthService) => ({
            gateway: {
              supergraphSdl,
              buildService({ url }) {
                return new (class extends RemoteGraphQLDataSource {
                  override willSendRequest({
                    request,
                    context,
                  }: GraphQLDataSourceProcessOptions<{ authorization?: string }>) {
                    if (context.authorization) {
                      request.http?.headers.set('authorization', context.authorization);
                    }
                  }
                })({ url });
              },
            },
            server: {
              context: async (req: {
                headers: IncomingHttpHeaders;
                body?: { operationName?: string; query?: string };
                query?: { operationName?: string; query?: string };
              }) => {
                // console.log(`context`);
                try {
                  if (configService.get('NODE_ENV') !== 'production') {
                    const devUserHeader = req.headers?.['x-dev-user'];
                    if (devUserHeader) {
                      req.headers.authorization = `x-dev-user-${devUserHeader}`;
                    }
                  }
                  const { authorization } = req.headers;

                  if (authorization) {
                    // If a token is present, validate it. This protects downstream services.
                    // An exception is thrown on failure, blocking the request.
                    await authService.validateToken(authorization);

                    return { authorization }; // Return the original header to be forwarded to the downstream service.
                  }

                  // If no token is present, check if the operation is on the public whitelist.
                  if (!isAnonymousRequestAllowed(req.body?.query ?? req.query?.query)) {
                    throw new UnauthorizedException('This operation requires authentication.');
                  }

                  return {}; // The operation is public, so allow it to proceed without any auth context.
                } catch (e) {
                  throw new GraphQLException(e instanceof Error ? e.message : String(e), {
                    extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
                    originalError: errorFromUnknown(e),
                  });
                }
              },

              playground:
                configService.get('NODE_ENV') !== 'production'
                  ? {
                      endpoint: '/graphql',
                      subscriptionEndpoint: '/graphql',
                    }
                  : false,
            },
          }),
        }),
      ],
    };
  }
}
