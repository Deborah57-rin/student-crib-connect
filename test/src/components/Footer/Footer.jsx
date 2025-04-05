import React from "react";
import { Link } from "react-router-dom";
import { Building, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer=() =>{
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary mb-4">
              <Building size={24} />
              <span>Campus Crib Connect</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Finding the perfect student accommodation near your campus made simple.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-sm text-muted-foreground hover:text-primary">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              For Property Owners
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/add-property" className="text-sm text-muted-foreground hover:text-primary">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  123 University Way, College Town, CT 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                <span className="text-sm text-muted-foreground">
                  info@campuscribconnect.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} Campus Crib Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer