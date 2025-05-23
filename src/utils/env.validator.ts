
/**
 * Environment variable validator
 * Validates that required environment variables are set
 */
export const validateEnv = (): { valid: boolean; missingVars: string[] } => {
  const requiredVars = ['VITE_CHIMERA_ROOT', 'VITE_RUST_TARGET'];
  const missingVars = requiredVars.filter(name => !import.meta.env[name]);
  
  return {
    valid: missingVars.length === 0,
    missingVars
  };
};

/**
 * Environment variable validation hook
 * Can be used in components to validate environment variables
 * and display warnings if they are missing
 */
export const useEnvValidator = () => {
  const result = validateEnv();
  
  if (!result.valid) {
    console.warn(`Missing required environment variables: ${result.missingVars.join(', ')}`);
  }
  
  return result;
};
