export default {
  testEnvironment: 'node',
  // Transform JSX (and JS containing JSX) via esbuild — matches our runtime build.
  // esbuild-jest returns CJS by default; we route .jsx/.js through it and let
  // Jest's ESM-vm machinery pick up non-transformed .mjs/.js as needed.
  transform: {
    '^.+\\.jsx?$': [
      'esbuild-jest',
      {
        loaders: { '.js': 'jsx', '.jsx': 'jsx' },
        sourcemap: true,
        target: 'node22',
        format: 'esm',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      },
    ],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^(\\.{1,2}/.*)\\.jsx$': '$1',
  },
  // Bundled-ESM deps (ink, @inkjs/ui, etc.) ship as ESM only; Jest handles them via
  // --experimental-vm-modules. Make sure esbuild-jest only transforms *our* sources.
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.test.jsx',
    '**/?(*.)+(spec|test).js',
    '**/?(*.)+(spec|test).jsx',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.jsx',
    '!src/**/*.test.js',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  extensionsToTreatAsEsm: ['.jsx'],
};
