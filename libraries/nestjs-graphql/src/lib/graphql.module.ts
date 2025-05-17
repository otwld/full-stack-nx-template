import { DynamicModule, FactoryProvider, Module } from '@nestjs/common';
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { mergeDeep } from '@agency-quest/sdk';

// Define default configuration for Apollo GraphQL
const DEFAULT_GRAPHQL_CONFIG: ApolloDriverConfig = {
  driver: ApolloDriver, // Use Apollo as the GraphQL driver
  autoSchemaFile: join(process.cwd(), 'schema.gql'), // Automatically generate the schema file
  sortSchema: true, // Ensure the schema is sorted for consistency
};

// Define a NestJS module for GraphQL configuration
@Module({})
export class GraphQLModule {
  /**
   * Synchronously configures the GraphQL module with optional overrides.
   * @param options Partial Apollo configuration to override defaults.
   * @returns A NestJS DynamicModule containing GraphQL configuration.
   */
  static forRoot(options?: Partial<ApolloDriverConfig>): DynamicModule {
    return {
      module: GraphQLModule,
      imports: [
        // Merge the provided options with the default configuration
        NestJSGraphQLModule.forRoot<ApolloDriverConfig>(
            DEFAULT_GRAPHQL_CONFIG
          // mergeDeep(DEFAULT_GRAPHQL_CONFIG, options ?? {}),
        ),
      ],
    };
  }

  /**
   * Asynchronously configures the GraphQL module using a factory provider.
   * @param optionsProvider A factory provider to generate Apollo configuration.
   * @returns A NestJS DynamicModule with async GraphQL configuration.
   */
  static forRootAsync(
    optionsProvider: FactoryProvider<Partial<ApolloDriverConfig>>,
  ): DynamicModule {
    return {
      module: GraphQLModule,
      imports: [
        NestJSGraphQLModule.forRootAsync<ApolloDriverConfig>({
          // Use the factory function to merge dynamic configuration
          useFactory: async (...args) =>
            // mergeDeep(
              DEFAULT_GRAPHQL_CONFIG,
              // await optionsProvider.useFactory(...args),
            // ),
          inject: optionsProvider.inject || [], // Inject dependencies if needed
        }),
      ],
    };
  }
}
