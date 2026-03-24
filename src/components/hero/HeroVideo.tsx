"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { gsap } from "@/lib/gsap-register";
import { useConsultationForm } from "@/hooks/useConsultationForm";
import { DateTimePicker } from "@/components/ui/DateTimePicker";

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
  const formWrapRef = useRef<HTMLDivElement>(null);
  const convoStartedRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout | typeof setInterval>[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [userChars, setUserChars] = useState(0);
  const [hubChars, setHubChars] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [phase, setPhase] = useState<"overlays" | "conversation" | "cta">(
    "overlays"
  );

  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    submitError,
    updateField,
    updateTimeSlots,
    submit,
  } = useConsultationForm();

  const selectedSlots = useMemo(
    () =>
      [
        formData.preferredTime1,
        formData.preferredTime2,
        formData.preferredTime3,
      ].filter(Boolean),
    [formData.preferredTime1, formData.preferredTime2, formData.preferredTime3]
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

  // Animate form open/close
  useEffect(() => {
    const el = formWrapRef.current;
    if (!el) return;

    if (showForm) {
      el.style.display = "block";
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [showForm]);

  return (
    <div ref={heroRef} className="relative h-screen bg-black" id="consultation">
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

                  {isSuccess ? (
                    <div className="mt-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-8 w-8 text-green-400"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-lg font-semibold text-white">
                        We&apos;ll Be in Touch!
                      </p>
                      <p className="mt-2 text-sm text-white/50">
                        We&apos;ll confirm your consultation time within 24
                        hours.
                      </p>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowForm(!showForm)}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light"
                      >
                        Schedule My Consultation
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`h-5 w-5 transition-transform duration-300 ${
                            showForm ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Expandable form */}
                      <div
                        ref={formWrapRef}
                        className="overflow-hidden"
                        style={{ display: "none", height: 0 }}
                      >
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                          }}
                          className="mt-6 rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-left backdrop-blur-md md:p-8"
                        >
                          {submitError && (
                            <div className="mb-6 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                              {submitError}
                            </div>
                          )}

                          <div className="grid gap-5 md:grid-cols-2">
                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-white/80">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  updateField("name", e.target.value)
                                }
                                placeholder="John Smith"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                                  errors.name
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                }`}
                              />
                              {errors.name && (
                                <p className="mt-1 text-xs text-red-400">
                                  {errors.name}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-white/80">
                                Email *
                              </label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  updateField("email", e.target.value)
                                }
                                placeholder="john@example.com"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                                  errors.email
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                }`}
                              />
                              {errors.email && (
                                <p className="mt-1 text-xs text-red-400">
                                  {errors.email}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-white/80">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                  updateField("phone", e.target.value)
                                }
                                placeholder="(713) 555-0100"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                                  errors.phone
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                }`}
                              />
                              {errors.phone && (
                                <p className="mt-1 text-xs text-red-400">
                                  {errors.phone}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-white/80">
                                Property Address *
                              </label>
                              <input
                                type="text"
                                value={formData.address}
                                onChange={(e) =>
                                  updateField("address", e.target.value)
                                }
                                placeholder="123 Main St, Houston, TX 77001"
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent ${
                                  errors.address
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                }`}
                              />
                              {errors.address && (
                                <p className="mt-1 text-xs text-red-400">
                                  {errors.address}
                                </p>
                              )}
                            </div>

                            <div>
                              <label className="mb-1.5 block text-sm font-medium text-white/80">
                                Number of Bedrooms *
                              </label>
                              <select
                                value={formData.bedrooms}
                                onChange={(e) =>
                                  updateField(
                                    "bedrooms",
                                    parseInt(e.target.value)
                                  )
                                }
                                className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-accent ${
                                  errors.bedrooms
                                    ? "border-red-500/50"
                                    : "border-white/10"
                                }`}
                              >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map(
                                  (n) => (
                                    <option
                                      key={n}
                                      value={n}
                                      className="bg-[#1a1a1a]"
                                    >
                                      {n} {n === 1 ? "bedroom" : "bedrooms"}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>

                            <div className="flex items-end">
                              <label className="flex cursor-pointer items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={formData.hasOffice}
                                  onChange={(e) =>
                                    updateField("hasOffice", e.target.checked)
                                  }
                                  className="h-5 w-5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                                />
                                <span className="text-sm font-medium text-white/80">
                                  Property has a home office
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="[&_p]:text-white/80 [&_span]:text-white/50 [&_button]:border-white/10 [&_.text-foreground]:text-white [&_.text-muted]:text-white/50 [&_.bg-card]:bg-white/5 [&_.border-card-border]:border-white/10 [&_.bg-background]:bg-white/5">
                              <DateTimePicker
                                selectedSlots={selectedSlots}
                                onSlotsChange={updateTimeSlots}
                              />
                            </div>
                            {(errors.preferredTime1 ||
                              errors.preferredTime2 ||
                              errors.preferredTime3) && (
                              <p className="mt-2 text-xs text-red-400">
                                Please select 3 preferred consultation times
                              </p>
                            )}
                          </div>

                          <div className="mt-8 text-center">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isSubmitting ? (
                                <>
                                  <svg
                                    className="h-5 w-5 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                      className="opacity-25"
                                    />
                                    <path
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                      className="opacity-75"
                                    />
                                  </svg>
                                  Submitting...
                                </>
                              ) : (
                                "Submit"
                              )}
                            </button>
                            <p className="mt-3 text-xs text-white/30">
                              We&apos;ll confirm your time within 24 hours. No
                              spam, ever.
                            </p>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
