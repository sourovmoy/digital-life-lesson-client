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
  contactPhone = "+880 1742 818496",
}) => {
  return (
    <footer className="bg-neutral text-neutral-content border-t border-base-300">
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
            <p className="text-sm text-neutral-content/70 leading-relaxed">
              A place to store, reflect on, and share the life lessons and
              wisdom you gather. Organize lessons, mark favorites, and explore
              public lessons from the community.
            </p>

            <div className="flex items-center space-x-3 mt-3">
              <a aria-label="Facebook" href="https://www.facebook.com/sourovmmoysanju/" className="hover:text-white/90">
                <FaFacebookF />
              </a>
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/sourovmoy/"
                className="hover:text-white/90"
              >
                <FaInstagram />
              </a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/sourov-dash/" className="hover:text-white/90">
                <FaLinkedinIn />
              </a>
              <a aria-label="GitHub" href="https://github.com/sourovmoy" className="hover:text-white/90">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm text-neutral-content/70">
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
            <p className="text-sm text-neutral-content/70">
              Email:{" "}
              <a href="" className="hover:text-white">
                {contactEmail}
              </a>
            </p>
            <p className="text-sm text-neutral-content/70 mt-2">
              Phone:{" "}
              <a href="" className="hover:text-white">
                {contactPhone}
              </a>
            </p>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Address</h4>
              <p className="text-sm text-neutral-content/70 leading-relaxed">
                Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Legal & CTA */}
          <div>
            <h4 className="font-semibold mb-3">Legal & More</h4>
            <ul className="space-y-2 text-sm text-neutral-content/70">
              <li>
                <Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">Contact Us</Link>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-neutral-content/70 mb-3">
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
                  className="w-full px-3 py-2 rounded-md bg-base-200 text-base-content placeholder-base-content/50 focus:outline-primary border border-base-300"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-content hover:bg-secondary transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-base-300 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-neutral-content/70">
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>

          <div className="text-sm text-neutral-content/70 flex items-center gap-4">
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
