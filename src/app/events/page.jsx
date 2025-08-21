import { getCollection } from "@/lib/dbconnect";
import Link from "next/link";

export default async function EventsPage() {
  const eventsCollection = await getCollection("events");
  const events = await eventsCollection.find().toArray();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id.toString()} className="card bg-base-100 shadow-xl">
          <figure>
            <img
              src={event.image}
              alt={event.eventName}
              className="h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{event.eventName}</h2>
            <p className="text-sm text-gray-600">{event.description.slice(0, 100)}...</p>
            <div className="mt-2">
              <span className="badge badge-outline">{event.eventType}</span>
              <span className="badge badge-outline ml-2">
                {new Date(event.eventDate).toDateString()}
              </span>
            </div>
            <div className="card-actions justify-between mt-4">
              <span className="text-sm font-semibold text-primary">📍 {event.eventLocation}</span>
              <Link
                href={`/events/${event._id.toString()}`}
                className="btn btn-sm btn-primary"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
