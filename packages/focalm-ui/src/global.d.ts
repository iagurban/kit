/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// interface ViteTypeOptions {
//   // By adding this line, you can make the type of ImportMetaEnv strict
//   // to disallow unknown keys.
//   // strictImportMetaEnv: unknown
// }

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_GRAPHQL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __initialAccessToken?: Promise<string | null>;
}
