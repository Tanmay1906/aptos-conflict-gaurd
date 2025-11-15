import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Moon, Sun, Search, User, Mail, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { WalletConnect } from "./WalletConnect";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const contactLinks = [
    {
      icon: Mail,
      label: "consult@lexguard.legal",
      href: "mailto:consult@lexguard.legal",
    },
    {
      icon: Phone,
      label: "+1 (555) 214-7820",
      href: "tel:+15552147820",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { name: "Home", path: "/", public: true },
    ...(isAuthenticated ? [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Add Case", path: "/add-case" },
      { name: "History", path: "/history" },
    ] : []),
    { name: "About", path: "/about", public: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="hidden lg:block border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-10">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Precision Conflict Intelligence for Modern Law Firms
            </p>
            <div className="flex items-center gap-6">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl border border-border/60 bg-background/80 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
              <ScaleLogo />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-primary tracking-tight group-hover:text-accent transition-colors">
                LexGuard
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Legal AI Suite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold transition-all duration-300 relative after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:bg-accent after:transition-all ${
                  isActive(link.path)
                    ? "text-accent after:w-full"
                    : "text-foreground/70 after:w-0 hover:text-foreground after:hover:w-full"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search matters..."
                  className="pl-10 w-64 glass-effect"
                />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {isAuthenticated ? (
              <>
                <WalletConnect />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      {user?.name}
                      <div className="text-xs text-muted-foreground font-normal">
                        {user?.email}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 glass-effect border border-border/60 rounded-2xl mt-2 animate-fade-in">
            <div className="flex flex-col gap-2 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 px-4 rounded-xl transition-colors ${
                    isActive(link.path)
                      ? "bg-accent text-accent-foreground shadow-glow"
                      : "text-foreground/80 hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="border-t pt-3 mt-2 space-y-2">
                  <div className="px-4 py-2 text-sm font-medium">
                    {user?.name}
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                  <WalletConnect />
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-4 rounded-xl text-foreground/80 hover:bg-muted transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="border-t pt-3 mt-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-4 rounded-xl text-foreground/80 hover:bg-muted transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}

              <div className="border-t pt-3 mt-2 space-y-2">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const ScaleLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className="w-7 h-7 text-primary"
  >
    <path
      d="M32 6c1.657 0 3 1.343 3 3v7.382l16.76 6.143a1.5 1.5 0 0 1 .99 1.415c0 12.39-7.997 22.44-17.75 24.612v4.7h5.5a2.5 2.5 0 0 1 0 5h-16a2.5 2.5 0 0 1 0-5h5.5v-4.7C18.247 46.94 10.25 36.89 10.25 24.5a1.5 1.5 0 0 1 .989-1.415L28 16.382V9c0-1.657 1.343-3 3-3Zm0 17.118L15.313 28.1c1.23 8.343 7.35 14.9 16.687 15.88 9.336-.98 15.456-7.537 16.687-15.88L32 23.118Z"
      fill="currentColor"
    />
  </svg>
);
