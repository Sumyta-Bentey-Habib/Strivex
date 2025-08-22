import dbconnect from "@/lib/dbconnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const data = await req.json();
  const eventsCollection = await dbconnect("events");

  const result = await eventsCollection.insertOne({
    ...data,
    userEmail: session.user.email, // associate event with user
  });

  return new Response(JSON.stringify({ id: result.insertedId }));
}
