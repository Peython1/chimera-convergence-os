
/**
 * ChimeraOS Project Constants
 * Centralized configuration for environment variables and build settings
 */
export const PROJECT_CONFIG = {
  ROOT_DIR: import.meta.env.VITE_CHIMERA_ROOT || '/opt/chimera',
  RUST_TARGET: import.meta.env.VITE_RUST_TARGET || 'x86_64-unknown-linux-gnu',
  BUILD_MODE: import.meta.env.MODE || 'development'
} as const;

export type ProjectConfig = typeof PROJECT_CONFIG;
