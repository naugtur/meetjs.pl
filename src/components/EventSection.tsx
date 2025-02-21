import { getUpcomingEvents } from "@/utils/getUpcomingEvents";
import { EventsList } from "./EventsList";

interface EventSectionProps {
  city: string;
}

export async function EventSection({ city }: EventSectionProps) {
  const events = await getUpcomingEvents();
  const cityEvents = events?.filter(event => event.city === city);

  return (
    <section className="flex flex-col items-center justify-center gap-12 pt-12">
      <h2 className="text-2xl font-bold">Upcoming events in {city}</h2>
      {cityEvents && cityEvents.length > 0 ? (
        <EventsList eventsList={cityEvents} />
      ) : (
        <p>No upcoming events in {city} at the moment.</p>
      )}
    </section>
  );
}