import Image from "next/image";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/db/event.model";
import { cacheLife } from 'next/cache';
// const events = [
//   { image: '/images/events/event1.jpg', 
//     title: 'Intra Debate Championship',
//     slug: 'event-1',
//     date: '2024-07-15',
//     time: '18:00',
//     location: 'DCS Campus' 
//   },
//   { image: '/images/events/event2.jpg', 
//     title: 'Club Aliance Meeting',
//     slug: 'event-2',
//     date: '2024-08-20',
//     time: '19:30',
//     location: 'KFC, Wari, Bangladesh?' 
//   },
//   { image: '/images/events/event3.jpg',
//     title: 'DCS Seminar',
//     slug: 'event-3',
//     date: '2024-09-10',
//     time: '17:00',    
//     location: 'DCS Auditorium' 
//   },
//   { image: '/images/events/event4.jpg',
//     title: 'DCS Hackathon',
//     slug: 'event-4',
//     date: '2024-10-05',
//     time: '20:00',    
//     location: 'DCS Lab'
//   },
//   { image: '/images/events/event5.jpg',
//     title: 'DCS Science Competition',
//     slug: 'event-5',
//     date: '2024-11-12',
//     time: '16:30',    
//     location: 'DCS Grounds' 
//   },
//   { image: '/images/events/event6.jpg',
//     title: 'Annual Tech Meetup',
//     slug: 'event-6',
//     date: '2024-12-01',
//     time: '18:45',    
//     location: 'DCS Hall' 
//   }, 
// ]

// interface Event {
//   image: string;
//   title: string;
//   slug: string;
//   date: string;
//   time: string;
//   location: string;
// }

// Base URL for API requests
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';


export default async function Home() {
  // Fetch operation for events from the API
  'use cache'; // Enable caching for this fetch operation (Constant data refetching is not logical for a homepage right!)
  cacheLife('hours'); // Cache for 1 hour
  const response = await fetch(`${BASE_URL}/api/events`, { next: { revalidate: 3600 } }); // Revalidate every hour! This means the data will be fresh within an hour.
  const {events} = await response.json(); // Parse the JSON response
  
  // const events: Event[] = data.events; // Extract events array from the response

  return (
    <section>
      <h1 className="text-center">Welcome to the Event Management System</h1>
      <p className="text-center mt-5">Manage your events efficiently and effortlessly.</p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3 className="text-center">Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event:IEvent) => ( // Type assertion to IEvent, why? Because fetched data is of type any by default.
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
