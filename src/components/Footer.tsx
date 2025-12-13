'use client'

import Link from "next/link";
import { footerLinks, socialLinks } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif font-bold mb-3">Adeola Prince</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              A transformative journey blending faith, logic, and science to explore 
              purpose (why are we here?), destiny (where are we going?), identity (who are we?), 
              and circular growth.
              <br />
              <br />
              Join Prince Adeola on the path of light for deep understanding and authentic becoming.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item, index) => (
                <Link
                  href={item.link} key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors" aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">

              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className="flex flex-col text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-primary transition-colors">
                  Book
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/preorder" className="text-muted-foreground hover:text-primary transition-colors">
                  Preorder
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Get in Touch</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="mailto:adeolaprincezz@yahoo.com" className="hover:text-primary transition-colors">
                  contact@princeadeola.com
                </a>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Adeola Prince. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;