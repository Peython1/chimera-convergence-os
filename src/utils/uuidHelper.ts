
import { v4 as originalUuidv4 } from 'uuid';

// Fallback implementation if the uuid package fails
const fallbackUuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Try to use the original UUID first, fallback to our implementation if it fails
export const getUuid = () => {
  try {
    return originalUuidv4();
  } catch (error) {
    console.warn('Using fallback UUID implementation due to error:', error);
    return fallbackUuidv4();
  }
};

export { originalUuidv4 as v4 };
