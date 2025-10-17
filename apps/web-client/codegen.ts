import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../schema.graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/generated.tsx': {
      plugins: ['typescript'],
      config: {
        namingConvention: {
          typeNames: 'change-case-all#pascalCase',
          transform: (str: string) => `Gql${str}`,
        },
      },
    },
    'graphql/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '../src/graphql/generated.tsx',
      },
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
