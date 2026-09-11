import { For } from 'solid-js';

export const SkipNavigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigationItems = [
    { id: 'timeline', label: 'Timeline', icon: '📅' },
    { id: 'evolution', label: 'Code Evolution', icon: '💻' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'fun-facts', label: 'Fun Facts', icon: '🎯' },
    { id: 'future', label: 'Future', icon: '🚀' },
    { id: 'stats', label: 'Statistics', icon: '📊' },
  ];

  return (
    <div class="mb-8 rounded-2xl bg-gray-800/90 p-4 shadow-lg backdrop-blur-sm md:bg-gray-900/90 md:p-6 md:backdrop-blur-md">
      <h3 class="mb-3 text-center text-base font-semibold text-white md:mb-4 md:text-lg">
        Quick Navigation
      </h3>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
        <For each={navigationItems}>
          {(item) => (
            <button
              onClick={() => scrollToSection(item.id)}
              class="group flex flex-col items-center gap-1 rounded-xl bg-gray-700/80 p-3 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-600/90 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent md:gap-2 md:p-4"
            >
              <span class="text-lg transition-transform group-hover:scale-110 md:text-2xl">
                {item.icon}
              </span>
              <span class="text-xs font-medium">{item.label}</span>
            </button>
          )}
        </For>
      </div>
    </div>
  );
};
