import { City } from '@/content/cities';

interface CityStatusIndicatorProps {
  status: City['status'];
}

const statusColors = {
  active: 'bg-green',
  paused: 'bg-gray-400',
  'coming-soon': 'bg-yellow-400',
  new: 'bg-blue-400',
  typescript: 'bg-blue-600',
} as const;

export const CityStatusIndicator = ({ status }: CityStatusIndicatorProps) => {
  return (
    <span
      className={`ml-2 inline-block h-2 w-2 rounded-full ${statusColors[status]}`}
    />
  );
};
