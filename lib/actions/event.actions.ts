'use server';

import { connectToDatabase } from "@/lib/mongodb";
import Event, { IEvent } from "@/db/event.model";

 
export default async function getSimilarEventsBySlug(slug: string): Promise<IEvent[]> {

    try {
        await connectToDatabase();
        
        const event = await Event.findOne({ slug });
        if (!event) {
            console.error('Event not found for slug:', slug);
            return [];
        }
        const simiarEvents:IEvent[] = await Event.find({_id:{$ne: event._id}, tags:{$in: event.tags } }).limit(6).lean<IEvent[]>().exec(); // Fetch 3 events excluding the current one
        
        return simiarEvents;

        } catch (error) {
        console.error('Error fetching similar events:', error);
        return [];
    }
}