import { Heart, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <span className="text-xl font-bold">BloodBridge</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting blood donors with those in urgent need. Join our
              community-driven network for faster, smarter, and life-saving
              blood donation connections.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+880 1860155123</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>bloodbridge654@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/donors"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Find Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Register as Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/request"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Request Blood
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/eligibility"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donation Eligibility
                </Link>
              </li>
              <li>
                <Link
                  href="/safety"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} BloodBridge. All rights reserved. Saving lives
            through community connections.
          </p>
        </div>
      </div>
    </footer>
  );
}
