/**
 * The page uses `scroll-behavior: smooth` for in-page anchors. Route changes
 * should jump to the top instantly (as Next.js does with
 * `data-scroll-behavior="smooth"`), so smooth scrolling is switched off while
 * the router scrolls after a navigation.
 */
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();
  const root = document.documentElement;
  let restore: ReturnType<typeof setTimeout> | undefined;

  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      clearTimeout(restore);
      root.style.scrollBehavior = 'auto';
    }
  });
  nuxtApp.hook('page:loading:end', () => {
    clearTimeout(restore);
    restore = setTimeout(() => {
      root.style.scrollBehavior = '';
    }, 300);
  });
});
