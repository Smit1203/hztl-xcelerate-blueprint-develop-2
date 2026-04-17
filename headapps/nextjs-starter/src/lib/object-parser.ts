// Global
import { set } from 'lodash';

export const expandObj = <T>(obj: Record<string, unknown>): T => {
  const expanded = {};

  for (const [key, value] of Object.entries(obj)) {
    set(expanded, key, value);
  }

  return expanded as T;
};

export const flattenObj = <T>(obj: Record<string, unknown>, parent?: string): T => {
  const flattened = {} as Record<string, unknown>;

  Object.keys(obj).forEach((key) => {
    const computedKey = `${parent ? parent + '.' : ''}${key}`;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObj({ ...value }, computedKey));
    } else {
      flattened[computedKey] = value;
    }
  });

  return flattened as T;
};
