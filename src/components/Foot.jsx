"use client";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Foot() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">About Strivex</h3>
          <p className="text-gray-400 leading-relaxed">
            Strivex is an annual sports event celebrating fitness, teamwork, and passion for sports. Join us for a wide range of competitions and activities.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" /> info@strivex.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-indigo-400" /> +880 1234 567890
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-indigo-400 transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Strivex. All rights reserved.
      </div>
    </footer>
  );
}
