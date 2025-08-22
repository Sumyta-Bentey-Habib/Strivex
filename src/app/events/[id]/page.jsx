import { ObjectId } from "mongodb";
import dbconnect from "@/lib/dbconnect";
import AddToDashboardButton from "@/components/AddToDashboardButton";

export default async function EventDetails({ params }) {
  const { id } = params;
  const eventsCollection = await dbconnect("events");

  const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
  if (!event) return <p className="p-6">Event not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{event.eventName}</h1>
      <img
        src={event.image}
        alt={event.eventName}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <p>{event.description}</p>
      <p>Event Type: {event.eventType}</p>
      <p>Date: {new Date(event.eventDate).toDateString()}</p>
      <p>Location: {event.eventLocation}</p>

      <AddToDashboardButton event={event} />
    </div>
  );
}
