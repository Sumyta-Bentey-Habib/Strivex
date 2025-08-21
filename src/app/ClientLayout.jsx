"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";
import Foot from "@/components/Foot";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <NavBar />
      {children}
      <Foot />
    </SessionProvider>
  );
}
