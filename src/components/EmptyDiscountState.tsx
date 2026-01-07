import { Ticket, Monitor, BookOpen } from 'lucide-react';
import { useTranslate } from '@tolgee/react';

type EmptyStateType = 'events' | 'software' | 'learning';

interface EmptyDiscountStateProps {
  type: EmptyStateType;
}

export default function EmptyDiscountState({ type }: EmptyDiscountStateProps) {
  const { t } = useTranslate();

  const getEmptyStateConfig = (type: EmptyStateType) => {
    switch (type) {
      case 'events':
        return {
          icon: <Ticket className="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
          titleKey: 'discounts.empty.events.title',
          descKey: 'discounts.empty.events.description',
        };
      case 'software':
        return {
          icon: <Monitor className="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
          titleKey: 'discounts.empty.software.title',
          descKey: 'discounts.empty.software.description',
        };
      case 'learning':
        return {
          icon: <BookOpen className="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
          titleKey: 'discounts.empty.learning.title',
          descKey: 'discounts.empty.learning.description',
        };
    }
  };

  const config = getEmptyStateConfig(type);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="p-12 text-center">
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-md ${config.iconBg}`}
        >
          {config.icon}
        </div>
        <h3 className={`mb-3 text-lg font-semibold ${config.textColor}`}>
          {t(config.titleKey)}
        </h3>
        <p
          className={`mx-auto max-w-md text-sm leading-relaxed ${config.descColor}`}
        >
          {t(config.descKey)}
        </p>
      </div>
    </div>
  );
}
