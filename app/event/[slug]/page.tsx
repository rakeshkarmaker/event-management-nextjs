import {Suspense} from "react";
import EventDetails from '@/components/EventDetails'




const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
    const slug = params.then((p) => p.slug);    

    return (
                <EventDetails params={slug} />

    )
}
export default EventDetailsPage