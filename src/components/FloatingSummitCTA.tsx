import { Sparkles, X } from '@/lib/lucide';
import { createSignal, onSettled, Show } from 'solid-js';
import { isServer } from '@solidjs/web';

export const FloatingSummitCTA = () => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [isDismissed, setIsDismissed] = createSignal(false);

  onSettled(() => {
    if (isServer) return;
    setIsDismissed(localStorage.getItem('summit2026-cta-dismissed') === 'true');
    if (isDismissed()) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  });

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('summit2026-cta-dismissed', 'true');
  };

  return (
    <Show when={!isDismissed() && isVisible()}>
      <div class="fixed bottom-6 right-6 z-50 duration-500 animate-in fade-in slide-in-from-bottom-5">
        <div class="relative rounded-lg bg-[#bcd35d] p-[2px] shadow-2xl shadow-[#bcd35d]/20">
          <div class="rounded-lg bg-gray-900 p-4">
            <button
              onClick={handleDismiss}
              class="absolute -right-2 -top-2 rounded-full bg-white p-1 text-gray-900 shadow-lg transition-transform hover:scale-110"
              aria-label="Dismiss"
            >
              <X class="h-4 w-4" />
            </button>

            <div class="flex items-start gap-3">
              <div class="flex-shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#bcd35d]">
                  <Sparkles class="h-5 w-5 text-black" />
                </div>
              </div>

              <div class="flex-1">
                <h3 class="mb-1 text-sm font-bold text-white">
                  🎉 Summit 2026
                </h3>
                <p class="mb-3 text-xs text-gray-300">
                  15th Anniversary • March 4
                </p>
                <a
                  href="https://summit.meetjs.pl/2026"
                  target="_blank"
                  rel="noopener"
                  class="inline-block rounded-md bg-[#bcd35d] px-4 py-2 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-[#bcd35d]/90 hover:shadow-lg"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};
