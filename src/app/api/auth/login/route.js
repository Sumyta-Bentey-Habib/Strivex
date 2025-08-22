import dbconnect from "@/lib/dbconnect";
import { compare } from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const usersCollection = await dbconnect("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), { status: 401 });
    }

    // Return only the necessary user info
    return new Response(
      JSON.stringify({ name: user.name, email: user.email }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
