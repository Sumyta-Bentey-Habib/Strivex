"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Foot from "@/components/Foot";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // marks client mount
  }, []);

  // Render a server-safe placeholder until client mounts
  if (!isClient) {
    return (
      <SessionProvider>
        <NavBar /> {/* server-safe NavBar handles initial render */}
        <div className="min-h-[50vh]"></div> {/* placeholder space for children */}
        <Foot />  {/* simple placeholder footer */}
      </SessionProvider>
    );
  }

  // Full layout after client has mounted
  return (
    <SessionProvider>
      <NavBar />
      {children}
      <Foot />
    </SessionProvider>
  );
}
