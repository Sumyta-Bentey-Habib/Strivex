"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();

  const navMenu = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/events">Events</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      {session && (
        <li>
          <Link href="/my-events">My Events</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Logo + mobile menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navMenu}
            {!session && (
              <>
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
                <li>
                  <Link href="/auth/register">Register</Link>
                </li>
              </>
            )}
            {session && (
              <li>
                <button onClick={() => signOut()} className="btn btn-sm btn-error">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <Link href="/" className="flex items-center gap-2">
          <Image src="/image/logo.png" width={40} height={40} alt="Strivex Logo" />
          <span className="text-xl font-bold">Strivex</span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          {navMenu}
          {!session && (
            <>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <button onClick={() => signOut()} className="btn btn-sm btn-error">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
