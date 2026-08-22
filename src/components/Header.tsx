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
  const pathname = usePathname();

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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-container mx-auto flex items-center justify-between px-5 lg:px-8 py-5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span className="font-semibold tracking-tight text-[18px] text-text-primary">
              ROHAN
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label-eyebrow hover:text-text-primary transition-colors"
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <Link href="/#contact" className="pill-secondary !py-2.5 !px-5 text-xs">
              CONTACT
            </Link>
          </nav>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden label-eyebrow border border-hairline rounded-full px-4 py-2"
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
