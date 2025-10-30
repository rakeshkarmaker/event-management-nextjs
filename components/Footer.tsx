import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-dark-100 text-light-100 mt-12">
      <div className="container mx-auto sm:px-10 px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="mb-4">DCS Club Alliance</h3>
            <p className="text-light-200 text-sm leading-relaxed">
              Bringing together passionate students through the diverse clubs and activities at Dhaka Collegiate School.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/clubs" className="text-light-200 hover:text-primary transition">
                  Explore Clubs
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-light-200 hover:text-primary transition">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-light-200 hover:text-primary transition">
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link href="/notices" className="text-light-200 hover:text-primary transition">
                  Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-light-200 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/member-directory" className="text-light-200 hover:text-primary transition">
                  Member Directory
                </Link>
              </li>
              <li>
                <Link href="/member-portal" className="text-light-200 hover:text-primary transition">
                  Member Portal
                </Link>
              </li>
              <li>
                <a href="/" className="text-light-200 hover:text-primary transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-light-200">
                <Mail size={18} />
                <span className="text-sm">support@dcs.edu.bd</span>
              </div>
              <div className="flex items-center gap-2 text-light-200">
                <Phone size={18} />
                <span className="text-sm">+880 2-9123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-light-200">
                <MapPin size={18} />
                <span className="text-sm">Dhaka Collegiate School, Dhaka</span>
              </div>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-light-200 hover:text-primary transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-light-200 hover:text-primary transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-light-200 hover:text-primary transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-light-200 hover:text-primary transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-light-200">
            <p>&copy; 2025 Dhaka Collegiate School Club Alliance. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}