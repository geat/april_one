"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

interface WebsiteSettings {
  site_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  youtube_url?: string;
}

export function Footer() {
  const [settings, setSettings] = useState<WebsiteSettings>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/website/settings");
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const currentYear = new Date().getFullYear();
  const siteName = settings.site_name || "ShopName";

  if (!mounted) {
    return null;
  }

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">{siteName}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted online store for quality products at competitive prices.
              We're committed to providing the best shopping experience.
            </p>
            {/* Social Media Links */}
            {mounted && (
              <div className="flex gap-3">
                {settings.facebook_url && (
                  <a
                    href={settings.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                )}
                {settings.twitter_url && (
                  <a
                    href={settings.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {settings.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {settings.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 flex items-center justify-center rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signin" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              {settings.contact_email && (
                <li className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {settings.contact_email}
                  </a>
                </li>
              )}
              {settings.contact_phone && (
                <li className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <a
                    href={`tel:${settings.contact_phone}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {settings.contact_phone}
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {settings.address}
                  </span>
                </li>
              )}
              {!settings.contact_email && !settings.contact_phone && !settings.address && (
                <>
                  <li className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <a
                      href="mailto:contact@shopname.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      contact@shopname.com
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <a
                      href="tel:+15551234567"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +1 (555) 123-4567
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span className="text-muted-foreground">
                      123 Main Street, New York, NY 10001
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
