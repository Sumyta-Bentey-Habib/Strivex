import dbconnect from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const eventsCollection = await dbconnect("events");
  await eventsCollection.deleteOne({
    _id: new ObjectId(params.id),
    userEmail: session.user.email, 
  });

  return new Response(JSON.stringify({ message: "Deleted" }));
}
