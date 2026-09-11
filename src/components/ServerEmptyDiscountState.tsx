import { Ticket, Monitor, BookOpen } from '@/lib/lucide';

type EmptyStateType = 'events' | 'software' | 'learning';

interface ServerEmptyDiscountStateProps {
  type: EmptyStateType;
  title: string;
  description: string;
}

export default function ServerEmptyDiscountState(
  props: ServerEmptyDiscountStateProps,
) {
  const getEmptyStateConfig = (type: EmptyStateType) => {
    switch (type) {
      case 'events':
        return {
          icon: <Ticket class="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
        };
      case 'software':
        return {
          icon: <Monitor class="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
        };
      case 'learning':
        return {
          icon: <BookOpen class="h-10 w-10 text-white" />,
          iconBg: 'bg-gradient-to-br from-green-500 to-teal-600',
          textColor: 'text-gray-900 dark:text-white',
          descColor: 'text-gray-600 dark:text-gray-400',
        };
    }
  };

  const config = getEmptyStateConfig(props.type);

  return (
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div class="p-12 text-center">
        <div
          class={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-md ${config.iconBg}`}
        >
          {config.icon}
        </div>
        <h3 class={`mb-3 text-lg font-semibold ${config.textColor}`}>
          {props.title}
        </h3>
        <p
          class={`mx-auto max-w-md text-sm leading-relaxed ${config.descColor}`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
}
