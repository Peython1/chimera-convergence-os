
/// <reference types="vite/client" />

/**
 * Type definitions for environment variables
 * This ensures type safety when accessing import.meta.env
 */
interface ImportMetaEnv {
  readonly VITE_CHIMERA_ROOT: string;
  readonly VITE_RUST_TARGET: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
