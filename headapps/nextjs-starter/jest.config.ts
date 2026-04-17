import structuredClone from '@ungap/structured-clone'; // can be written as import { structuredClone } from '@ungap/structured-clone';  if esModuleInterop flag is used

const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    // Static asset mocks must come first to catch them before other patterns
    // Specific mock for Splide CSS import
    '@splidejs/splide/css': '<rootDir>/src/__mocks__/styleMock.js',
    '@splidejs/splide/dist/css/splide.min.css': '<rootDir>/src/__mocks__/styleMock.js',
    // CSS/SCSS files return an empty object (for CSS modules)
    '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
    // Image and other binary files return a string stub
    '\\.(jpg|jpeg|png|gif|svg|webp|ico|bmp|eot|otf|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/src/lib/$1',
    '^temp/(.*)$': '<rootDir>/src/temp/$1',
    '^helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^stories/(.*)$': '<rootDir>/src/stories/$1',
    '^sitecore\\.config$': '<rootDir>/sitecore.config.ts',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!(@sitecore-content-sdk/nextjs|@sitecore-jss/sitecore-jss-react|@sitecore-feaas/clientside|@sitecore/byoc|@sitecore-search|dot-prop|filter-obj|htm)/)',
  ],
  globals: {
    structuredClone: structuredClone,
  },
};

export default config;
