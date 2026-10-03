"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/uses", label: "Uses" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Notes, project and app pages use a light theme; the header has to flip with them.
  const onPaper =
    pathname.startsWith("/notes") || pathname.startsWith("/apps") || /^\/work\/.+/.test(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          scrolled
            ? onPaper
              ? "bg-paper/85 backdrop-blur-md border-b border-paper-text/10"
              : "bg-ink/80 backdrop-blur-md border-b border-hairline"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-container mx-auto flex items-center justify-between px-5 lg:px-8 py-5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span
              className={`font-semibold tracking-tight text-[18px] ${
                onPaper ? "text-paper-text" : "text-text-primary"
              }`}
            >
              ROHAN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`label-eyebrow transition-colors ${
                  onPaper ? "text-paper-text/55 hover:text-paper-text" : "hover:text-text-primary"
                } ${pathname.startsWith(item.href) ? (onPaper ? "!text-paper-text" : "!text-text-primary") : ""}`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <Link
              href="/#contact"
              className={`pill-secondary !py-2.5 !px-5 text-xs ${
                onPaper ? "!text-paper-text !border-paper-text/20 hover:!border-paper-text/50" : ""
              }`}
            >
              CONTACT
            </Link>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className={`md:hidden label-eyebrow border rounded-full px-4 py-2 ${
              onPaper ? "border-paper-text/20 text-paper-text/70" : "border-hairline"
            }`}
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink flex flex-col">
          <div className="max-w-container mx-auto w-full flex items-center justify-between px-5 lg:px-8 py-5">
            <span className="font-semibold tracking-tight text-[18px]">ROHAN</span>
            <button
              onClick={() => setOpen(false)}
              className="label-eyebrow border border-hairline rounded-full px-4 py-2"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-5 lg:px-8 max-w-container mx-auto w-full">
            {[...navItems, { href: "/#contact", label: "Contact" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-4 py-3 border-b border-hairline"
              >
                <span className="font-mono text-sm text-text-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[36px] md:text-[56px] font-semibold tracking-tight text-text-muted group-hover:text-text-primary transition-colors">
                  {item.label.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>

          <div className="border-t border-hairline px-5 lg:px-8 py-5">
            <div className="max-w-container mx-auto w-full flex justify-between font-mono text-label uppercase text-text-subtle">
              <span>Kolkata, IN</span>
              <a href="mailto:skrohanparveag@gmail.com" className="hover:text-text-primary">
                skrohanparveag@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
