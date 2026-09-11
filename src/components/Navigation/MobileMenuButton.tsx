import { Show } from 'solid-js';
import { FaSolidBars, FaSolidXmark } from 'solid-icons/fa';

import { DisclosureButton, useDisclosure } from '@/components/ui/disclosure';

export const MobileMenuButton = () => {
  const disclosure = useDisclosure();
  return (
    <div class="inset-y-0 flex items-center p-4 sm:hidden">
      <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span class="absolute -inset-0.5" />
        <span class="sr-only">Open main menu</span>
        <Show
          when={disclosure?.open()}
          fallback={<FaSolidBars class="block h-6 w-6" aria-hidden="true" />}
        >
          <FaSolidXmark class="block h-6 w-6" aria-hidden="true" />
        </Show>
      </DisclosureButton>
    </div>
  );
};
