export const faqs = [
  // Product & System
  {
    q: "What is CleverHub?",
    a: "CleverHub is an AI-powered smart home automation system built in Houston, TX. It includes a central hub with a 40 TOPS AI accelerator and satellite nodes that bring voice control, presence detection, and environmental sensors to every room in your home.",
    category: "product",
  },
  {
    q: "How does voice control work?",
    a: "Say \"Clever\" in any room and the nearest satellite node picks up your command. About 70% of commands — lights, locks, thermostat — are processed instantly on-device in under 200 milliseconds. More complex requests are streamed to the cloud and back in under a second. If your internet goes down, the system falls back to fully local AI processing.",
    category: "product",
  },
  {
    q: "What devices does CleverHub control?",
    a: "CleverHub works with smart lights, locks, thermostats, cameras, speakers, TVs, garage doors, and more via WiFi, Bluetooth, Zigbee, and IR blaster. Each satellite node also includes an IR blaster for controlling legacy devices like older TVs and air conditioners.",
    category: "product",
  },
  {
    q: "What are satellite nodes?",
    a: "Satellite nodes are compact wireless devices placed in each room. Every node includes a microphone, speaker, temperature and humidity sensor, ambient light sensor, precision presence detection, air quality monitoring, IR blaster, and RGB status LED. The standard system includes 4 satellite nodes.",
    category: "product",
  },

  // Privacy & Security
  {
    q: "Is my voice data private?",
    a: "Yes. All voice processing happens locally on the hub's 40 TOPS AI accelerator. No audio recordings are ever sent to external servers. When complex requests need cloud processing, only the transcribed text is sent — never raw audio. Privacy is built into the hardware, not just a policy.",
    category: "privacy",
  },
  {
    q: "What happens when the internet goes down?",
    a: "CleverHub keeps working. The on-device AI accelerator handles voice commands locally with a 3-5 second response time. Lights, locks, thermostat, scenes, and all local automations continue to function. Cloud-dependent features like weather updates resume when connectivity returns.",
    category: "privacy",
  },

  // Installation & Pricing
  {
    q: "How much does CleverHub cost?",
    a: "CleverHub offers two tiers: the Apartment system (one hub plus one satellite node) starts at $1,899 — designed for smaller spaces with an efficient, compact compute core. The Standard system (one hub plus four satellite nodes) is $2,999 and uses a higher-performance compute core for demanding local AI workloads. Both include all built-in sensors and initial setup. Additional satellite nodes can be added for $650 each. Optional cloud subscriptions for advanced AI features are available at $100/month but not required for core functionality.",
    category: "pricing",
  },
  {
    q: "How is CleverHub installed?",
    a: "We handle the full installation. After a free consultation where we assess your property and design a layout, our team installs the hub and satellite nodes, configures your devices, and sets up family profiles. For new construction (CleverHome), the system is pre-installed during the build. Typical installation takes 2-4 hours for an existing home.",
    category: "pricing",
  },
  {
    q: "Do you service areas outside Houston?",
    a: "We're currently focused on the Houston, TX metro area for hands-on installation. We're expanding to other Texas cities soon. Contact us to discuss your location — we may be able to accommodate nearby areas.",
    category: "pricing",
  },

  // Family & Features
  {
    q: "What are Family AI Agents?",
    a: "Every family member gets their own named AI agent with a custom wake word. Dad might say \"Hey Jarvis\" while a daughter says \"Hey Luna\" — each agent has its own personality and responds to age-appropriate commands. Six permission tiers (adult, teenager, tween, child, toddler, visitor) control what each person can access.",
    category: "features",
  },
  {
    q: "Can I control CleverHub from my phone?",
    a: "Yes. The CleverHub mobile app (coming soon for iOS and Android) gives you full device control, family management, voice commands, and a chat interface to talk to your home from anywhere. You can also launch the TV dashboard remotely from the app.",
    category: "features",
  },
  {
    q: "What is CleverAide?",
    a: "CleverAide is an add-on module for assisted living care. It provides medication reminders with confirmation tracking, three daily wellness check-ins, fall detection via precision presence sensors, and multi-channel caregiver alerts via push, Telegram, and WhatsApp. It's designed for elderly or disabled family members who benefit from voice-first assistance.",
    category: "features",
  },

  // For Professionals
  {
    q: "I'm a builder — how does CleverHome work?",
    a: "CleverHome is pre-installed during new construction so buyers move in to a fully configured smart home. Builders earn a 20% ongoing revenue share on monthly cloud subscriptions, creating a new profit center that differentiates listings. We handle the installation and support — builders just include it in their spec.",
    category: "professional",
  },
  {
    q: "I manage short-term rentals — what does CleverHost offer?",
    a: "CleverHost automates the entire guest lifecycle: WiFi credential rotation between stays, 6-category guest profile wipes, voice concierge mode for local recommendations, pre-check-in climate control, automated smart lock codes, and energy management. Multi-property dashboards let you manage your entire portfolio from one interface. Starting at $99/month.",
    category: "professional",
  },
];
