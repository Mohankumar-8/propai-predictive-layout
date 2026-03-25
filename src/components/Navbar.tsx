import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Predict", to: "/predict" },
  { label: "About", to: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    },
    [open],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 glass-strong transition-shadow duration-300",
        scrolled && "shadow-lg shadow-foreground/[0.03]",
      )}
    >
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-8 h-14 sm:h-16">
        <Link
          to="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-foreground select-none transition-opacity hover:opacity-80 duration-200"
        >
          Prop<span className="text-primary">AI</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={location.pathname === link.to ? "page" : undefined}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === link.to
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              )}
            >
              {link.label}
              {location.pathname === link.to && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-primary transition-all duration-300" />
              )}
            </Link>
          ))}
          <ThemeToggle />
          <Link to="/predict" tabIndex={-1}>
            <Button size="sm" className="ml-3">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-muted active:scale-95 transition-all duration-150"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span className="relative block w-5 h-5">
              <Menu className={cn("absolute inset-0 w-5 h-5 transition-all duration-300", open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100")} />
              <X className={cn("absolute inset-0 w-5 h-5 transition-all duration-300", open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 top-14 sm:top-16 z-40 bg-foreground/20 backdrop-blur-sm md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Mobile nav */}
      <div
        ref={mobileNavRef}
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-14 sm:top-16 right-0 z-50 h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] w-72 max-w-[85vw] glass-strong md:hidden transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col px-4 py-4 gap-1 h-full">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              aria-current={location.pathname === link.to ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === link.to
                  ? "text-foreground bg-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                open && "animate-fade-in",
              )}
              style={{ animationDelay: open ? `${i * 50}ms` : "0ms", animationFillMode: "both" }}
            >
              {location.pathname === link.to && (
                <span className="w-1 h-4 rounded-full bg-primary shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
          <div className="mt-auto pt-4 border-t border-border/50">
            <Link to="/predict" onClick={() => setOpen(false)} tabIndex={-1}>
              <Button size="sm" className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
