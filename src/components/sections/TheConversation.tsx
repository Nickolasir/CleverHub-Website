"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-register";

const userMessage = "Good Morning CleverHub. Let's start the day.";
const hubResponse =
  "I just started the Coffee. But you'll have to get going. Traffic is picking up out there and you have a 9 am with Scott...";

export function TheConversation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [userChars, setUserChars] = useState(0);
  const [hubChars, setHubChars] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setUserChars(userMessage.length);
      setHubChars(hubResponse.length);
      return;
    }

    const totalChars = userMessage.length + hubResponse.length;
    const userEnd = userMessage.length / totalChars;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress;
        if (p <= userEnd) {
          const t = p / userEnd;
          setUserChars(Math.floor(t * userMessage.length));
          setHubChars(0);
        } else {
          setUserChars(userMessage.length);
          const t = (p - userEnd) / (1 - userEnd);
          setHubChars(Math.floor(t * hubResponse.length));
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-warm-gray px-6 py-32"
    >
      {/* Subtle background image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-gray via-[#111] to-warm-gray opacity-80" />

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-12 text-center text-sm font-semibold uppercase tracking-widest text-accent">
          A Morning with CleverHub
        </p>

        {/* User message */}
        <div className="flex justify-start">
          <div className="max-w-md rounded-3xl rounded-bl-lg bg-white/10 px-6 py-4 backdrop-blur-sm">
            <p className="text-xs font-medium text-white/40 mb-2">You</p>
            <p className="text-lg leading-relaxed text-white">
              {userMessage.slice(0, userChars)}
              {userChars < userMessage.length && userChars > 0 && (
                <span className="cursor-blink" />
              )}
              {userChars === 0 && (
                <span className="text-white/20">...</span>
              )}
            </p>
          </div>
        </div>

        {/* CleverHub response */}
        <div className="mt-6 flex justify-end">
          <div className="max-w-md rounded-3xl rounded-br-lg bg-accent/20 px-6 py-4 backdrop-blur-sm">
            <p className="text-xs font-medium text-accent/70 mb-2">
              CleverHub
            </p>
            <p className="text-lg leading-relaxed text-white">
              {hubResponse.slice(0, hubChars)}
              {hubChars < hubResponse.length && hubChars > 0 && (
                <span className="cursor-blink" />
              )}
              {hubChars === 0 && userChars === userMessage.length && (
                <span className="text-white/20">...</span>
              )}
            </p>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>
    </section>
  );
}
