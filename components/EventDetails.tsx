//Here is what Nextjs 16 will look like
import Image from 'next/image';
import { cacheLife } from 'next/cache';
import { notFound } from 'next/navigation';
import EventBooking from '@/components/EventBooking';
import getSimilarEventsBySlug from '@/lib/actions/event.actions';
import { IEvent } from '@/db/event.model';
import EventCard from '@/components/EventCard';

// Base URL for API requests
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';


// Making a reusable component for event details item
const EventDetailsItem = ({ icon, alt, label }: { icon: string; alt: string; label: string }) => {

    return (
        <section>
            <div className="flex-row-gap-2 items-center py-2">
                <Image src={icon} alt={alt} width={20} height={20} />
                <span className="text-sm text-light-200">{label}</span>
            </div>
        </section>)
}

// Agenda/details component
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

// Tags component
const EventTags = ({ tags }: { tags: string[] }) => {
    return (
        <div className="flex flex-row gap-2 flex-wrap">
            {tags.map((tag) => (
                <span
                    key={tag}
                    role="status"
                    className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-dark-100/40 text-light-100 border border-dark-200 hover:bg-primary/10 hover:text-primary transition"
                >
                    {tag}
                </span>
            ))}
        </div>
    );
};

//v1.5.0- Helper to convert MongoDB objects (ObjectId, Dates) into plain JS objects
// Required because Next.js 16 only allows plain objects to be passed from Server → Client components
// Prevents runtime errors like: "Only plain objects can be passed to Client Components"
const sanitizeDoc = (doc: any) => {
  if (!doc) return doc;
  return {
    ...doc,
    _id: doc._id?.$oid ?? (doc._id?.toString ? doc._id.toString() : String(doc._id)),
    createdAt: doc.createdAt ? (typeof doc.createdAt === "string" ? doc.createdAt : new Date(doc.createdAt).toISOString()) : undefined,
    updatedAt: doc.updatedAt ? (typeof doc.updatedAt === "string" ? doc.updatedAt : new Date(doc.updatedAt).toISOString()) : undefined,
  };
};



const EventDetails = async ({params}:{params: Promise<string>})=> {
    'use cache';
    cacheLife('hours'); // Cache for 1 hour
    const slug = await params;

    let event;

    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, { next: { revalidate: 60 } }); // Revalidate every hour! This means the data will be fresh within an hour.
        if (!request.ok) {
            if (request.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`);
        }
        const response = await request.json(); // Parse the JSON response. Note destructuring name must be same as in the response from the API
        event = response.event;
        event = sanitizeDoc(event);
        if (!event) return notFound();


    } catch (error) {
        console.error('Error event fetching:', error);
        return notFound();
    }


    //destructuring the event object
    const { title, date, time, location, overview, description, mode, audience, image, agenda, organizer, tags, } = event;

    const bookingCount = 25; // Dummy booking count for now 
    //Similar events
const similarEvents: IEvent[] = (await getSimilarEventsBySlug(slug)).map(sanitizeDoc);


    return (
        <section id='event'>
            <div className='header'>
                <h1 className="center my-2">Event Details</h1>
                <p className='mt-2'>{description}</p>
            </div>
            <div className="details">
                {/* Left side- dividing it into two sides! */}
                <div className="content">
                    <Image src={image} alt='Event Image' height={800} width={800} />

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <EventDetailsItem icon="/icons/calendar.svg" alt="date" label={date} />
                        <EventDetailsItem icon="/icons/clock.svg" alt="time" label={time} />
                        <EventDetailsItem icon="/icons/pin.svg" alt="location" label={location} />
                        <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailsItem icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>

                    <EventAgenda agendaItems={agenda} />

                    <section className="flex-col-gap-2">
                        <h2>Event Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Tags</h2>
                    </section>
                    {/* Below the section! */}
                    <EventTags tags={tags} />

                </div>

                {/* Right side*/}
                <aside className="booking lg:col-span-1 bg-dark-100 glass rounded-lg p-6">
                    <div className="signup-card">
                        <h2 className="mb-4">Event Booking</h2>
                        {/* Check how many people booked and Tags Section */}
                        {(bookingCount > 0) ? (
                            <p className="mb-4 text-light-200">{`${bookingCount} people have booked for this event.`}</p>
                        ) : (
                            <p className="text-sm">Be the first to book!</p>
                        )}
                        <EventBooking />
                    </div>
                </aside>

            </div>



            <div className="mt-20 space-y-7">
                <h3 className="text-center">Featured Events</h3>

                <ul className="events">
                    {similarEvents && similarEvents.length > 0 && similarEvents.map((event: IEvent) => ( // Type assertion to IEvent, why? Because fetched data is of type any by default.
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />

                        </li>
                    ))}
                </ul>
            </div>

        </section>
    );

}

export default EventDetails