// Fail fast on a misconfigured deployment, like @t3-oss/env-nextjs did.
export default defineNitroPlugin(() => {
  try {
    useServerEnv();
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw error;
  }
});
