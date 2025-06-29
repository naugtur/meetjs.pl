import { DisclosureButton } from '@headlessui/react';
import { FaBars, FaX } from 'react-icons/fa6';

interface MobileMenuButtonProps {
  open: boolean;
}

export const MobileMenuButton = ({ open }: MobileMenuButtonProps) => {
  return (
    <div className="inset-y-0 flex items-center p-4 sm:hidden">
      <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
        <span className="absolute -inset-0.5" />
        <span className="sr-only">Open main menu</span>
        {open ? (
          <FaX className="block h-6 w-6" aria-hidden="true" />
        ) : (
          <FaBars className="block h-6 w-6" aria-hidden="true" />
        )}
      </DisclosureButton>
    </div>
  );
};
