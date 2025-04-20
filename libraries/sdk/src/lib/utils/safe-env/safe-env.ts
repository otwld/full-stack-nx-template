export function safeEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`[SafeEnv]: Expected environment variable ${key} to be set.`);

  return value;
}