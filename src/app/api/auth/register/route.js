import dbconnect from "@/lib/dbconnect";
import { hash } from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const usersCollection = await dbconnect("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const result = await usersCollection.insertOne({ name, email, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User registered", id: result.insertedId }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
