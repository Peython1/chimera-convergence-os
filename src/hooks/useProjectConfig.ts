
import { PROJECT_CONFIG } from '@/config/project.constants';

/**
 * Custom hook for accessing centralized project configuration
 * @returns ProjectConfig object with all environment and build settings
 */
export const useProjectConfig = () => {
  return PROJECT_CONFIG;
};
