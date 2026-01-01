"use client";
import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  Check,
  CreditCard,
  HeartPulse,
  Link,
  MailCheck,
  MessageCircle,
  Shield,
  Star,
  User,
  Users,
} from "lucide-react";
import { useProgressState } from "../hooks/useProgressState";

const steps = [
  { icon: Star, label: "Welcome" },
  { icon: Star, label: "Full Name" },
  { icon: User, label: "Date of Birth" },
  { icon: HeartPulse, label: "Blood Type" },
  { icon: MailCheck, label: "Phone Number" },
  { icon: Users, label: "Email" },
  { icon: MessageCircle, label: "Finished" },
];

const ProgressNav = () => {
  const { progressState } = useProgressState();
  const completed = progressState.index;
  const [windowWidth, setWindowWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render nothing until we know windowWidth to avoid SSR mismatch
  if (windowWidth === null) return null;

  return (
    <nav className="flex gap-x-2 gap-y-1 lg:gap-0 flex-wrap lg:flex-nowrap items-center w-full">
      {steps.map((step, index) => {
        const completedStep = index <= completed;
        const isLg = windowWidth >= 1024;

        const clipPath = isLg
          ? index === 0
            ? "polygon(0% 0%, 100% 0%, 93% 100%, 0% 100%)"
            : "polygon(7% 0%, 100% 0%, 93% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

        return (
          <div
            key={index}
            className={classNames(
              "relative",
              index < steps.length - 1 ? "-mr-1" : ""
            )}
          >
            <div
              className={classNames(
                "px-1 md:px-2 lg:px-4 py-0.5 w-18 md:w-25 lg:w-31 text-[0.6rem] text-white/50 whitespace-nowrap transition duration-200",
                "bg-white/5",
                { "bg-white/25 text-white!": completedStep }
              )}
              style={{ clipPath }}
            >
              <span className="block">{step.label}</span>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default ProgressNav;
