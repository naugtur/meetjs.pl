/**
 * "Now" for time-dependent rendering (expired promos, upcoming events,
 * relative dates). During hydration the client reuses the server's time, so
 * server and client markup match; afterwards (client-side navigation) the
 * real current time is used.
 */
export const useRenderNow = (): Date => {
  const nuxtApp = useNuxtApp();
  const serverNow = useState('render-now', () => Date.now());
  return new Date(
    import.meta.client && !nuxtApp.isHydrating ? Date.now() : serverNow.value,
  );
};
