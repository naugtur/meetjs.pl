// Minimal `--key value` / `--flag` argument parser for the parity scripts.

export const parseArgs = (argv = process.argv.slice(2)) => {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      args._.push(arg);
      continue;
    }
    const [rawKey, inlineValue] = arg.slice(2).split(/=(.*)/s);
    const key = rawKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    if (inlineValue !== undefined) {
      args[key] = inlineValue;
    } else if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) {
      args[key] = argv[++i];
    } else {
      args[key] = true;
    }
  }
  return args;
};

/** Splits a comma-separated option into a list (empty → undefined). */
export const listArg = (value) =>
  typeof value === 'string' && value.length > 0
    ? value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined;

export const fail = (message) => {
  console.error(`✖ ${message}`);
  process.exit(2);
};
