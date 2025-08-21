import dbconnect from "@/lib/dbconnect";

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
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="font-semibold">
        Event Type: <span className="text-primary">{event.eventType}</span>
      </p>
      <p className="font-semibold">
        Date: <span className="text-primary">{new Date(event.eventDate).toDateString()}</span>
      </p>
      <p className="font-semibold">
        Location: <span className="text-primary">{event.eventLocation}</span>
      </p>
    </div>
  );
}


import { ObjectId } from "mongodb";
