"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap-register";

const overlays = [
  {
    text: "Meet CleverHub.",
    subtext: "Your home just got a brain.",
  },
  {
    text: "AI Brain. Local Processing.",
    subtext: "40 TOPS of on-device intelligence.",
  },
  {
    text: "Every Room. Connected.",
    subtext: "Satellite nodes bring voice to the whole home.",
  },
  {
    text: "Your Home, Intelligent.",
    subtext: "Near-instant voice control that just works.",
  },
];

const userMessage = "Good Morning CleverHub. Let's start the day.";
const hubResponse =
  "I just started the Coffee. But you'll have to get going. Traffic is picking up out there and you have a 9 am with Scott...";

// 6 scenes in video — conversation starts at the last scene
const LAST_SCENE_START = 5 / 6; // ~83% through the video

export function HeroVideo() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const convoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const convoStartedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout | typeof setInterval>[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [userChars, setUserChars] = useState(0);
  const [hubChars, setHubChars] = useState(0);
  const [phase, setPhase] = useState<"overlays" | "conversation" | "cta">(
    "overlays"
  );

  // Track a timer so it can be cleaned up on unmount
  const track = useCallback(
    (id: ReturnType<typeof setTimeout | typeof setInterval>) => {
      timersRef.current.push(id);
      return id;
    },
    []
  );

  // Typewriter effect with cleanup support
  const typeText = useCallback(
    (
      setText: (n: number) => void,
      fullText: string,
      speed: number
    ): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        const interval = track(
          setInterval(() => {
            i++;
            setText(i);
            if (i >= fullText.length) {
              clearInterval(interval);
              resolve();
            }
          }, speed)
        );
      });
    },
    [track]
  );

  // Start conversation when video reaches the last scene
  const startConversation = useCallback(() => {
    if (convoStartedRef.current) return;
    convoStartedRef.current = true;

    // Kill the overlay timeline to prevent race conditions
    tlRef.current?.kill();

    // Fade out any remaining overlay
    overlayRefs.current.forEach((el) => {
      if (el) gsap.to(el, { opacity: 0, duration: 0.4 });
    });

    setPhase("conversation");

    // Fade in conversation container after a beat
    track(
      setTimeout(() => {
        if (convoRef.current) {
          gsap.fromTo(
            convoRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }

        typeText(setUserChars, userMessage, 40).then(() => {
          track(
            setTimeout(() => {
              typeText(setHubChars, hubResponse, 30).then(() => {
                track(
                  setTimeout(() => {
                    setPhase("cta");
                    if (ctaRef.current) {
                      gsap.fromTo(
                        ctaRef.current,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
                      );
                    }
                  }, 600)
                );
              });
            }, 500)
          );
        });
      }, 300)
    );
  }, [typeText, track]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setUserChars(userMessage.length);
      setHubChars(hubResponse.length);
      setPhase("cta");
      return;
    }

    // Sequence the text overlays on load
    const tl = gsap.timeline();
    tlRef.current = tl;
    overlayRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 30 });
      const holdTime = i === 0 ? 2.5 : 2;
      tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(el, { opacity: 1, duration: holdTime })
        .to(el, { opacity: 0, y: -15, duration: 0.6, ease: "power2.in" });
    });

    // Listen for video reaching the last scene
    const video = videoRef.current;
    const onTimeUpdate = () => {
      if (!video || !video.duration) return;
      const progress = video.currentTime / video.duration;
      if (progress >= LAST_SCENE_START) {
        startConversation();
        video.removeEventListener("timeupdate", onTimeUpdate);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", onTimeUpdate);
    }

    return () => {
      tl.kill();
      video?.removeEventListener("timeupdate", onTimeUpdate);
      // Clean up all tracked timers
      timersRef.current.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
      timersRef.current = [];
    };
  }, [typeText, startConversation]);

  return (
    <div ref={heroRef} className="relative h-screen bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/images/keyframe-01.png"
        aria-label="CleverHub smart home product showcase"
      >
        <source src="/video/cleverhub-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

      {/* Content layer */}
      <div className="relative flex h-full flex-col items-center justify-center px-6">
        {/* Text overlays (stacked, only one visible at a time) */}
        {overlays.map((overlay, i) => (
          <div
            key={overlay.text}
            ref={(el) => {
              overlayRefs.current[i] = el;
            }}
            className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center ${
              phase !== "overlays" ? "hidden" : ""
            }`}
            style={{ opacity: 0 }}
          >
            <h2 className="font-[var(--font-outfit)] text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
              {overlay.text}
            </h2>
            <p className="mt-5 max-w-lg text-lg font-light text-white/60 md:text-xl">
              {overlay.subtext}
            </p>
          </div>
        ))}

        {/* Conversation + CTA (appears after overlays) */}
        {phase !== "overlays" && (
          <div className="w-full max-w-3xl">
            {/* Conversation */}
            <div ref={convoRef}>
              <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-accent/80">
                A Morning with CleverHub
              </p>

              {/* User message */}
              <div className="flex justify-start">
                <div className="max-w-md rounded-2xl rounded-bl-md bg-white/10 px-5 py-4 backdrop-blur-md">
                  <p className="mb-2 text-xs font-medium text-white/40">You</p>
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

              {/* Hub response */}
              {userChars >= userMessage.length && (
                <div className="mt-4 flex justify-end">
                  <div className="max-w-md rounded-2xl rounded-br-md bg-accent/15 px-5 py-4 backdrop-blur-md">
                    <p className="mb-2 text-xs font-medium text-accent/70">
                      CleverHub
                    </p>
                    <p className="text-lg leading-relaxed text-white">
                      {hubResponse.slice(0, hubChars)}
                      {hubChars < hubResponse.length && hubChars > 0 && (
                        <span className="cursor-blink" />
                      )}
                      {hubChars === 0 && (
                        <span className="text-white/20">...</span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            {phase === "cta" && (
              <div ref={ctaRef} className="mt-10" style={{ opacity: 0 }}>
                <div className="text-center">
                  <h3 className="font-[var(--font-outfit)] text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    Ready to Make Your Space Intelligent?
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm text-white/50">
                    Schedule a free consultation. We&apos;ll design a CleverHub
                    setup tailored to your property.
                  </p>

                  <a
                    href="#consultation"
                    data-track="cta_hero_consultation"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
                  >
                    Schedule My Consultation
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
