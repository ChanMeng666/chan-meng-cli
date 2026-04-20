/**
 * Empty stub for `react-devtools-core`. Aliased via esbuild so the Ink CLI
 * bundle stays slim. Ink's devtools integration only activates when
 * `process.env.DEV === 'true'`; if a user sets that, they can install
 * `react-devtools-core` themselves and re-run the source directly.
 */
export default {
  connectToDevTools: () => {},
};
