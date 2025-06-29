import { EventType } from '@/types/event';

export const changeCityName = (event: EventType) => {
  switch (event.city) {
    case 'Bielsko Biała':
      return { ...event, city: 'Bielsko-Biała' };
    case 'Trójmiasto':
      return { ...event, city: 'Gdańsk' };
    default:
      return event;
  }
};
