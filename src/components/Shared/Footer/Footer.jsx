import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";
import logo from "../../../assets/images/logo.png";

const Footer = ({
  siteName = "Digital Life Lessons",
  contactEmail = "hello@digitallifelessons.example",
  contactPhone = "+880 1234 567890",
}) => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & short about */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={` ${siteName}logo`}
                className="h-20 w-20 rounded-md object-cover"
              />
              <span className="font-semibold text-lg">{siteName}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A place to store, reflect on, and share the life lessons and
              wisdom you gather. Organize lessons, mark favorites, and explore
              public lessons from the community.
            </p>

            <div className="flex items-center space-x-3 mt-3">
              <a aria-label="Facebook" href="#" className="hover:text-white/90">
                <FaFacebookF />
              </a>
              <a aria-label="Twitter" href="#" className="hover:text-white/90">
                <FaTwitter />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="hover:text-white/90"
              >
                <FaInstagram />
              </a>
              <a aria-label="LinkedIn" href="#" className="hover:text-white/90">
                <FaLinkedinIn />
              </a>
              <a aria-label="GitHub" href="#" className="hover:text-white/90">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/public-lessons" className="hover:text-white">
                  Public Lessons
                </Link>
              </li>
              <li>
                <Link to="/upgrade" className="hover:text-white">
                  Pricing / Upgrade
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-lesson" className="hover:text-white">
                  Add Lesson
                </Link>
              </li>
              <li>
                <Link to="/dashboard/my-lesson" className="hover:text-white">
                  My Lessons
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-400">
              Email:{" "}
              <a href="" className="hover:text-white">
                {contactEmail}
              </a>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Phone:{" "}
              <a href="" className="hover:text-white">
                {contactPhone}
              </a>
            </p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Legal & CTA */}
          <div>
            <h4 className="font-semibold mb-3">Legal & More</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link className="hover:text-white">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link className="hover:text-white">Cookie Policy</Link>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">
                Want to stay updated?
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  alert("Thanks!");
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  aria-label="Email for newsletter"
                  required
                  placeholder="Your email"
                  className="w-full px-3 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-lime-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-lime-500 text-white hover:bg-lime-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          <div className="text-sm text-gray-400 flex items-center gap-4">
            <Link className="hover:text-white">Terms</Link>
            <Link className="hover:text-white">Privacy</Link>
            <a href="" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
