"use client"; // MUST be the first line

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToDashboardButton({ event }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToDashboard = async () => {
    if (!session) return alert("Login first");

    const res = await fetch("/api/events/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (res.ok) {
      alert("Added to dashboard!");
      router.push("/dashboard");
    } else {
      alert("Failed to add");
    }
  };

  if (!session) return null;

  return (
    <button onClick={handleAddToDashboard} className="btn btn-primary mt-4">
      Add to Dashboard
    </button>
  );
}
