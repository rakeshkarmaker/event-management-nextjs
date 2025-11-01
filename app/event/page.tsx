import EventCard from "@/components/EventCard";
import { IEvent } from "@/db/event.model";
import { cacheLife } from "next/cache";


// Base URL for API requests
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';


export default async function Events() {
     'use cache'; // Enable caching for this fetch operation (Constant data refetching is not logical for a homepage right!)
      cacheLife('hours'); // Cache for 1 hour
      const response = await fetch(`${BASE_URL}/api/events`, { next: { revalidate: 3600 } }); // Revalidate every hour! This means the data will be fresh within an hour.
      const {events} = await response.json();


    return (
        <section>
      <h1 className="text-center">View All Events</h1>
      
      <div className="mt-20 space-y-7">

        <ul className="events">
          {events && events.length > 0 && events.map((event:IEvent) => ( // Type assertion to IEvent, why? Because fetched data is of type any by default.
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    )

}