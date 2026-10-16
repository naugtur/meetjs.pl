/** Becomes visible once the element scrolls into view (former ScrollAnimations.tsx). */
export const useScrollAnimation = (threshold = 0.1) => {
  const target = ref<HTMLElement | null>(null);
  const isVisible = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    if (!target.value) return;
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true;
          observer?.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(target.value);
  });

  onBeforeUnmount(() => observer?.disconnect());

  return { target, isVisible };
};
