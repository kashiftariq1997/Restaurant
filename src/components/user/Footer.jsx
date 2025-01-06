import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import FooterLogo from "../../assets/images/FooterLogo.png";

export const Footer = () => {
  return (
    <footer className="bg-[#f253aa] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="text-2xl font-bold mb-4">
              <img 
                src={FooterLogo} 
                alt="Turquoise"
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="hover:text-gray-200 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Heures d'ouverture</h3>
            <ul className="space-y-2">
              <li>Lundi - Vendredi: 10h - 22h</li>
              <li>Samedi: 11h - 23h</li>
              <li>Dimanche: 11h - 21h</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={18} />
                Email: infos@turquoise.sn
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} />
                Téléphone:
              </li>
              <li className="pl-6">+221 78 152 19 19</li>
              <li className="pl-6">+221 77 640 97 13</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p>Copyright 2024 © turquoise.sn - All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};