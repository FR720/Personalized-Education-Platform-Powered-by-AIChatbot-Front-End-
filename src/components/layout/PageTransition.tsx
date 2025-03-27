
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className 
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setIsVisible(true);
      }, 250);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
