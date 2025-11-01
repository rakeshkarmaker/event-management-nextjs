// v1.3.4- app/api/events/[slug]/route.ts
'use server';
import Event, { IEvent } from "@/db/event.model";
import { connectToDatabase } from "@/lib/mongodb";
import {NextRequest, NextResponse} from "next/server";



//Route parameter type for type safety
type RouteParams ={
    params: Promise<{
        slug: string;
    }>;
};

export async function GET(request: Request, {params}: RouteParams) : Promise<NextResponse> {
    try {
        await connectToDatabase();  //Connect to the database

        const {slug} = await params; //Extract slug from route parameters


        if(!slug || typeof slug !== 'string'|| slug.trim() === '') {
            return NextResponse.json({message: 'Bad Request. Invalid slug parameter', status: 400});
        }

        //Sanitizing the slug itself (ex: trimming whitespace, converting to lowercase)
        const sanitizedSlug = slug.toLowerCase().trim();

        //Find the event by slug with sanitized slug, querying the database, event model
        const event = await Event.findOne({ slug: sanitizedSlug }).lean(); //exec() to execute the query, lean() for plain JS object
        
        if(!event) {
            return NextResponse.json({message: 'Event not found', status: 404});
        }
        
        return NextResponse.json({ message:'Event fetch OK', event}, {status: 200 });
        
    }catch (error) {
        console.error('Error fetching event by slug:', error);
        return NextResponse.json({ message: 'Internal Server Error', status: 500 });
    }
    
    const { slug } = await params;


}