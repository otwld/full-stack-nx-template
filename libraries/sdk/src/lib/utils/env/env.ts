export function env(key: string): string | undefined {
  return process.env[key] || undefined;
}
