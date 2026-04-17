const figmaConfigImport = require('./tailwind-figma-config');
// In storybook, we need .default.
const figmaConfig = figmaConfigImport.default ?? figmaConfigImport;
// Global
const plugin = require('tailwindcss/plugin');

const merged = mergeDeep(
  figmaConfig.Global,
  // We only need 1 brand config since they're all the same, so we'll use the first one.
  figmaConfig.Brand,
  // We only need 1 device config since they're all the same, so we'll use the first one.
  figmaConfig.Device,
  // We only need 1 theme config since they're all the same, so we'll use the first one.
  figmaConfig.Theme
);

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...merged,
    },
  },
  plugins: [require('tailwind-variants')],
};
