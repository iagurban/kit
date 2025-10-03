import { checked, isSomeObject, isString } from '@gurban/kit/core/checks';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';

export const registerGraphqlSubgraphModule = (schemaPath: string) =>
  GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    imports: [AuthModule],
    inject: [ConfigService, AuthService],

    useFactory: (configService: ConfigService, authService: AuthService) => ({
      /** TypeScript decorators. This is essential for the schema registry. */
      autoSchemaFile: {
        path: schemaPath,
        federation: 2, // Explicitly use Apollo Federation v2
      },

      sortSchema: true,

      /** Creates a context object for each request. This is how your resolvers
       *  get access to request headers and the authenticated user.
       */
      context: ({ req }: { req: FastifyRequest }) => {
        // For a standard HTTP request, the `req` object is passed here.
        // Your @GqlAuthGuard will use this to extract the user from the JWT.
        return { req };
      },

      // --- Subscriptions (Real-time via WebSockets) ---

      /** Configures the WebSocket server for GraphQL Subscriptions */
      subscriptions: {
        'graphql-ws': {
          /**
           * This hook is called when a client tries to establish a WebSocket connection.
           * It's the perfect place to authenticate the connection.
           */
          onConnect: context => {
            const extra = checked(context.extra, isSomeObject, () => `extra must be an object`);

            const connectionParams = checked(
              context.connectionParams,
              isSomeObject,
              () => `connectionParams must be an object`
            );

            // `connectionParams` are sent by the client in its connection_init payload.
            const authToken = checked(
              connectionParams.authToken,
              isString,
              () => `authToken must be a string (authentication token is required for WebSocket connection)`
            );

            extra.user = authService.accessTokenToPayload(authToken);
          },
        },
      },

      playground: configService.get('NODE_ENV') !== 'production',
    }),
  });
