import Link from "next/link";
import { MapPin, Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg text-white">
                <MapPin size={24} />
              </div>
              <span className="text-2xl font-bold">
                Bharat<span className="text-secondary">Yatra</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the soul of India. From the snowy peaks of the Himalayas to the backwaters of Kerala, experience the diverse culture and heritage.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Popular States</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/state/rajasthan" className="hover:text-white transition-colors">Rajasthan</Link></li>
              <li><Link href="/state/kerala" className="hover:text-white transition-colors">Kerala</Link></li>
              <li><Link href="/state/himachal-pradesh" className="hover:text-white transition-colors">Himachal Pradesh</Link></li>
              <li><Link href="/state/goa" className="hover:text-white transition-colors">Goa</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>hello@bharatyatra.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span>New Delhi, India</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bharat Yatra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
