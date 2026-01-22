"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

type RopeThemeToggleProps = {
  className?: string;
};

const storageKey = "theme-preference";

export function RopeThemeToggle({ className }: RopeThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextIsDark = stored ? stored === "dark" : prefersDark;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    setIsReady(true);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem(storageKey, nextIsDark ? "dark" : "light");
  };

  const handlePull = async () => {
    // 1. Pull down
    await controls.start({
      y: 20,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    });
    
    // 2. Toggle state "at the bottom"
    toggleTheme();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    // 3. Spring back up
    await controls.start({
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 12 },
    });
  };

  if (!isReady) return null;

  // Variants for the gentle swaying idle animation
  const swayVariants: Variants = {
    idle: {
      rotate: [-1.5, 1.5],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={cn("fixed right-10 top-0 z-50", className)}>
      <motion.div
        className="flex flex-col items-center origin-top cursor-pointer active:cursor-pointer"
        initial="idle"
        animate="idle"
        whileHover={{ scale: 1.02 }}
        variants={swayVariants}
        onClick={handlePull}
      >
        {/* The Rope - extended length to handle layout */}
        {/* We animate the Y position of this container group with 'controls' */}
        <motion.div 
            animate={controls}
            className="flex flex-col items-center"
        >
            {/* Thread/String - made very long and pulled up with negative margin to prevent detaching */}
            <div className="w-[1.5px] h-[300px] -mt-[220px] bg-neutral-300 dark:bg-neutral-600" />
            
            {/* Minimal Handle */}
            <div className="relative flex items-center justify-center -mt-0.5 w-8 h-8 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm transition-colors duration-300">
                <div className="text-neutral-500 dark:text-neutral-400">
                    {isDark ? <Moon size={14} /> : <Sun size={14} />}
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
