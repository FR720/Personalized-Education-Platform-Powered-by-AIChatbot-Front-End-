
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PageTransition from "@/components/layout/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="relative w-40 h-40 mb-8">
          <div className="absolute inset-0 bg-blue-200/30 dark:bg-blue-900/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              404
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">
          Page not found
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 text-center max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="shadow-sm">
            <ArrowLeft className="h-4 w-4 mr-2" /> Return to Home
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
};

export default NotFound;
