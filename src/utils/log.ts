export const makeLogger = (prefix: string) => ({
  log: (...vals: any[]) => console.log(`[${prefix}]`, ...vals),
  warn: (...vals: any[]) => console.warn(`[${prefix}]`, ...vals),
  error: console.error.bind(console),
});
