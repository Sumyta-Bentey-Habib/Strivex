"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user events
  const fetchEvents = async () => {
    if (!session) return;
    try {
      const res = await fetch("/api/events/user");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") fetchEvents();
  }, [status]);

  // Delete event
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Event deleted!");
        setEvents(events.filter((e) => e._id !== id)); // update UI instantly
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting event.");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please login to view your dashboard.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

      {/* Add Event Button */}
      <Link
        href="/dashboard/add"
        className="btn btn-primary mb-6 inline-block"
      >
        + Add Event
      </Link>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">{event.eventName}</h2>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
                  Date: {new Date(event.eventDate).toDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(event._id)}
                className="btn btn-sm btn-error"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
