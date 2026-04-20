#!/usr/bin/env node

/**
 * esbuild bundler for chan-meng CLI.
 *
 * Bundles src/cli.js (and its React/Ink tree when present) into a single
 * ESM file at dist/cli.js with a shebang banner so the output is directly
 * executable as the `chan-meng` bin.
 *
 * Usage:
 *   node esbuild.config.js            # one-shot build
 *   node esbuild.config.js --watch    # rebuild on change
 */

import { build, context } from 'esbuild';
import { chmod, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const OUT_FILE = resolve(ROOT, 'dist/cli.js');
const WATCH = process.argv.includes('--watch');

const options = {
  // Bundle the root entry (index.js calls startCLI()); src/cli.js only exports.
  entryPoints: [resolve(ROOT, 'index.js')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  outfile: OUT_FILE,
  // createRequire shim so bundled CJS deps that do `require('node:tty')`
  // (e.g. yoctocolors-cjs transitively via inquirer) work under ESM output.
  // The source file (index.js) already carries the shebang; esbuild preserves it.
  banner: {
    js: [
      "import { createRequire as __cjsCreateRequire } from 'node:module';",
      'const require = __cjsCreateRequire(import.meta.url);',
    ].join('\n'),
  },
  jsx: 'automatic',
  loader: { '.js': 'jsx' },
  // Keep native-ish / fs-heavy deps out of the bundle so npm install resolves them.
  external: ['conf'],
  // Ink's React Devtools integration is gated behind `process.env.DEV === 'true'`.
  // esbuild still sees the static import, so we alias it to an empty stub to
  // avoid either shipping ~500KB of devtools or requiring users to install it.
  alias: {
    'react-devtools-core': resolve(ROOT, 'scripts/react-devtools-core-stub.js'),
  },
  logLevel: 'info',
  sourcemap: false,
  legalComments: 'none',
};

async function ensureDistDir() {
  const distDir = dirname(OUT_FILE);
  if (!existsSync(distDir)) {
    await mkdir(distDir, { recursive: true });
  }
}

async function postBuild() {
  // npm sets the executable bit on bin files at install time, but we want
  // `npm start` / direct `node dist/cli.js` to behave sanely on unix locally.
  try {
    await chmod(OUT_FILE, 0o755);
  } catch {
    // Windows: chmod is a no-op; ignore.
  }
}

await ensureDistDir();

if (WATCH) {
  const ctx = await context({
    ...options,
    plugins: [
      {
        name: 'post-build',
        setup(b) {
          b.onEnd(async (result) => {
            if (result.errors.length === 0) {
              await postBuild();
            }
          });
        },
      },
    ],
  });
  await ctx.watch();
  console.log('esbuild: watching src/ for changes...');
} else {
  await build(options);
  await postBuild();
}
