import React, { useEffect, useState } from "react";

import { BookOpen, LayoutDashboard, LogOut, Menu, User, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/authStore";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  const { token: isAuthenticated, user, logOut } = useUserStore();

  const handleLogout = () => {
    logOut();
    navigate("/signin");
  };
  const UserDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative p-1 rounded-full  "
        >
          <div className="flex  items-center justify-center rounded-full h-8 w-8 bg-slate-100 ">
            <User className=" text-slate-600    " />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-slate-500">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 dark:text-red-400 cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = isAuthenticated
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4 mr-1.5" />,
        },
        {
          name: "Courses",
          path: "/courses",
          icon: <BookOpen className="h-4 w-4 mr-1.5" />,
        },
      ]
    : [{ name: "Home", path: "/", icon: null }];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out px-4 md:px-6",
        isScrolled
          ? "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-soft"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center"
        >
          <div className="mr-2 relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-md animate-pulse"></div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 relative flex items-center justify-center">
              <div className="h-3 w-3 bg-white rounded-full"></div>
            </div>
          </div>
          CourseNav
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center",
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

          {isAuthenticated ? (
            <UserDropdown />
          ) : (
            <>
              <Link to="/signin">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-600 dark:text-slate-300"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="ml-2 shadow-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white dark:bg-slate-900 z-40 transition-all duration-300 ease-in-out pt-20 px-6",
          isMobileMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 rounded-md text-base font-medium transition-all flex items-center",
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              )}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 my-2"></div>

          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-md text-base font-medium transition-all flex items-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-3 rounded-md text-base font-medium transition-all text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-3 rounded-md text-base font-medium transition-all bg-blue-600 text-white shadow-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
