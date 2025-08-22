import dbconnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

// Add Event
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session)
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });

  const userEmail = session.user.email;
  const event = await req.json();

  if (!event || !event.eventName) {
    return new Response(JSON.stringify({ error: "Invalid event data" }), {
      status: 400,
    });
  }

  // assign unique ID for delete/edit later
  event._id = new ObjectId();

  const usersCollection = await dbconnect("users");

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $push: { dashboardEvents: event } }
  );

  if (result.modifiedCount === 1) {
    return new Response(
      JSON.stringify({ message: "Event added to dashboard" }),
      { status: 200 }
    );
  } else {
    return new Response(JSON.stringify({ error: "Failed to add event" }), {
      status: 500,
    });
  }
}

// Get Events
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session)
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });

  const userEmail = session.user.email;
  const usersCollection = await dbconnect("users");

  const user = await usersCollection.findOne(
    { email: userEmail },
    { projection: { dashboardEvents: 1 } }
  );

  return new Response(JSON.stringify({ events: user?.dashboardEvents || [] }), {
    status: 200,
  });
}

// Delete Event
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session)
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
    });

  const { eventId } = await req.json();
  if (!eventId)
    return new Response(JSON.stringify({ error: "Event ID required" }), {
      status: 400,
    });

  const userEmail = session.user.email;
  const usersCollection = await dbconnect("users");

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $pull: { dashboardEvents: { _id: new ObjectId(eventId) } } }
  );

  if (result.modifiedCount === 1) {
    return new Response(JSON.stringify({ message: "Event deleted" }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ error: "Failed to delete event" }), {
      status: 500,
    });
  }
}
