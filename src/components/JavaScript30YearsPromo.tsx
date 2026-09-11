import { FaSolidArrowRight, FaSolidCalendar } from 'solid-icons/fa';

export const JavaScript30YearsPromo = () => {
  return (
    <section class="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left side - Icon and text */}
          <div class="flex items-center gap-4 text-white">
            <div class="rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <FaSolidCalendar class="h-12 w-12" />
            </div>
            <div>
              <h3 class="mb-1 text-2xl font-bold">30 Years of JavaScript</h3>
              <p class="text-white/90">
                Explore the interactive timeline of JavaScript&apos;s evolution
              </p>
            </div>
          </div>

          {/* Right side - CTA button */}
          <div class="flex flex-col gap-3 sm:flex-row">
            <a
              href="/30-years-of-javascript"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3 font-semibold text-yellow-600 shadow-lg transition-colors duration-200 hover:bg-gray-100 hover:shadow-xl"
            >
              <FaSolidCalendar class="h-5 w-5" />
              Explore Timeline
              <FaSolidArrowRight class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
