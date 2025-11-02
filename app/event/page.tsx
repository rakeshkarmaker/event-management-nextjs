import EventCard from "@/components/EventCard";
import { IEvent } from "@/db/event.model";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/db/event.model";


export default async function Events() {
      await connectToDatabase();
      const events = await Event.find({}).lean() as unknown as IEvent[];


    return (
        <section>
      <h1 className="text-center">View All Events</h1>
      
      <div className="mt-20 space-y-7">

        <ul className="events">
          {events && events.length > 0 && events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    )

}