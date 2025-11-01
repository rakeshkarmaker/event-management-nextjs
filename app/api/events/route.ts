'use server';
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/db/event.model";
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary v2 API


// GET  /api/events - Fetch all events
export async function GET() {
    try {
        await connectToDatabase(); //Ensure database connection
        const events = await Event.find({}).lean(); //Fetch all events from the database as plain JS objects
        return NextResponse.json({ message: 'Events fetch OK', events }, { status: 200 });
    } catch (err) {
        console.log('Error in GET /api/events:', err);
        return NextResponse.json({ message: 'Internal Server Error. Events fetch failed', error: err instanceof Error ? err.message : 'Unknown', status: 500 });
    }
}


// POST /api/events - Create a new event

export async function POST(request: Request) {
    // error handling!
    try {
        //First we need to connect to the database
        await connectToDatabase(); //Ensure database connection

        //Then we need to parse the request body to get the event data
        const formData = await request.formData(); // Express request.Body()

        let eventData; //empty object to hold event data

        try {
            eventData = Object.fromEntries(formData.entries()); //Convert form data to a plain object

            // Validate required fields
            const requiredFields = ['title', 'date', 'location', 'description'];
            for (const field of requiredFields) {
                if (!eventData[field]) {
                    return NextResponse.json({ message: `Bad Request. Missing required field: ${field}`, status: 400 });
                }
            }

            //v1.3.3- Adding file upload handling for event images
            const imageFile = formData.get('image') as File | null;
            if (imageFile && imageFile instanceof File) {  //file exists and is of type File
                
                // Uploading to the cloud!
                const arrayBuffer = await imageFile.arrayBuffer(); // Convert file to array buffer
                const buffer = Buffer.from(arrayBuffer); // Convert array buffer to Node.js Buffer

                const uploadResult = await new Promise( (resolve, reject) => {
                    cloudinary.uploader.upload_stream({ folder: 'event_images' }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                        }).end(buffer);
                }

                );
                eventData.image = (uploadResult as {secure_url: string}).secure_url; // Store the secure URL of the uploaded image   

            } else {
                return NextResponse.json({ message: 'Image upload not uploaded or invalid.', status: 501 });
            }

            //v1.3.4- Minor fix to have tags and agenda in the right order!
            let tags = JSON.parse(formData.get('tags') as string);
            let agenda = JSON.parse(formData.get('agenda') as string);

            //Create a new event //v1.3.4- Minor fix, event will be now created with a JSON parsed Agenda
            const newEvent = await Event.create({...eventData,tags:tags,agenda:agenda});

            //Return a success response with the created event data
            return NextResponse.json({ message: 'Event created successfully', event: newEvent, status: 201 });

        } catch (err) {
            console.log('Error parsing form data:', err);
            return NextResponse.json({ message: 'Bad Request. Invalid form data', error: err instanceof Error ? err.message : 'Unknown', status: 400 });
        }


    } catch (err) {
        console.log('Error in POST /api/events:', err);
        // return new Response('Internal Server Error', { status: 500 });
        // So here is what's happening here: We are returning a JSON response with a message indicating that there was an internal server error during event creation.
        // Additionally, we include the error message if the error is an instance of the Error class; otherwise, we provide a generic 'Unknown' message. The status code is set to 500 to indicate a server error.
        return NextResponse.json({ message: 'Internal Server Error. Event creation failed', error: err instanceof Error ? err.message : 'Unknown', status: 500 });

    }
}


