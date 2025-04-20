import type { CodegenConfig } from '@graphql-codegen/cli';

const GRAPHQL_ENDPOINT = process.env['GRAPHQL_ENDPOINT'];
if (!GRAPHQL_ENDPOINT)
  throw new Error(
    '[Codegen]: Expected environment variable GRAPHQL_ENDPOINT to be set.',
  );

const config: CodegenConfig = {
  schema: GRAPHQL_ENDPOINT,
  documents: './src/**/*.graphql',
  generates: {
    './src/lib/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-angular',
      ],
      config: {
        addExplicitOverride: true,
      },
    },
  },
};
export default config;
