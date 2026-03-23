import { Button } from "@/components/ui/button";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Hire Us", href: "/hire" },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              data-ocid="nav.link"
            >
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">F&B</span>
              </div>
              <span className="font-bold text-foreground text-lg leading-tight hidden sm:block">
                F&B JOB Hire
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentPath === link.href
                      ? "text-primary bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/hire">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                  data-ocid="nav.primary_button"
                >
                  Hire Now
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === link.href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link to="/hire" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground font-semibold"
                  data-ocid="nav.primary_button"
                >
                  Hire Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F&B</span>
                </div>
                <span className="font-bold text-white text-lg">
                  F&B JOB Hire
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Connecting businesses with top-tier freelance talent since 2020.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href="https://facebook.com"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SiX className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <SiLinkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    Video Editing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    Logo Design
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="hover:text-white transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="hover:text-white transition-colors"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hire"
                    className="hover:text-white transition-colors"
                  >
                    Hire Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <a
                    href="mailto:jayaparma4241@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    jayaparma4241@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919699858423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: +91 9699858423
                  </a>
                </li>
                <li>Mon–Fri, 9am–6pm</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
            <span>
              &copy; {new Date().getFullYear()} F&B JOB Hire. All rights
              reserved.
            </span>
            <span>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                className="hover:text-white/70 transition-colors underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
