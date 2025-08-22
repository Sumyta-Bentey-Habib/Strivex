"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensures client-side rendering
  }, []);

  // Render a simple navbar until client mounts
  if (!mounted) {
    return (
      <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/image/logo.png" width={40} height={40} alt="Strivex Logo" />
            <span className="text-2xl font-bold text-primary">Strivex</span>
          </Link>
        </div>
      </div>
    );
  }

  const isLoggedIn = status === "authenticated";

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-6">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/image/logo.png" width={40} height={40} alt="Strivex Logo" />
          <span className="text-2xl font-bold text-primary">Strivex</span>
        </Link>
      </div>

      {/* Centered Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/about">About</Link></li>
          {isLoggedIn && <li><Link href="/dashboard">Dashboard</Link></li>}
        </ul>
      </div>

      {/* Right Buttons */}
      <div className="navbar-end flex items-center gap-2">
        {!isLoggedIn && (
          <>
            <Link href="/auth/login" className="btn btn-sm btn-primary">Login</Link>
            <Link href="/auth/register" className="btn btn-sm btn-secondary">Register</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <span className="hidden lg:block text-sm font-medium text-gray-700">
              Hi, {session.user?.name}
            </span>
            <Link href="/dashboard" className="btn btn-sm btn-info">Dashboard</Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-sm btn-error"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
