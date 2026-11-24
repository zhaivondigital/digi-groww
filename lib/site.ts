export const SITE = {
  name: "Bridge Code Digi Grow",
  tagline: "Create. Connect. Grow.",
  whatsapp: "919361655631",
  phoneDisplay: "+91 93616 55631",
  email: "digigrowdesk@gmail.com",
  instagram: "digi.growwmediaofficial",
  url: "https://bridgecodedigigrow.com", // replace with the live domain
  // Showreel video: drop a file in /public (e.g. /public/showreel.mp4) and set "/showreel.mp4".
  // Empty = animated placeholder.
  showreel: "",
};

// Client logos: placeholders until real logos are added (set `src` to an image in /public).
export const CLIENTS: { name: string; src?: string }[] = Array.from({ length: 10 }, (_, i) => ({ name: `Client ${String(i + 1).padStart(2, "0")}` }));

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/careers", label: "Careers" },
] as const;

export const SERVICES = [
  {
    id: "branding",
    title: "Personal branding & creator management",
    footer: "Personal Branding",
    icon: "user",
    short: "Define your identity, content style, positioning and growth strategy.",
    long: "Define your identity, content style, positioning and growth strategy. We work out what makes you different and turn it into a brand people remember.",
    chips: ["Brand identity", "Content pillars", "Positioning", "Growth roadmap"],
  },
  {
    id: "social",
    title: "Social media account management",
    footer: "Social Media Management",
    icon: "calendar",
    short: "Content calendars, captions, publishing, engagement and performance reporting.",
    long: "Content calendars, captions, publishing, engagement and performance reporting. Your channels stay active and on-brand without eating your week.",
    chips: ["Calendars", "Captions", "Publishing", "Engagement", "Monthly reports"],
  },
  {
    id: "production",
    title: "Creative production",
    footer: "Creative Production",
    icon: "video",
    short: "Reels, promotional videos, campaigns and visual stories that carry your identity.",
    long: "Reels, promotional videos, campaigns and visual stories that carry your identity, from concept and shoot to final edit.",
    chips: ["Reels", "Promo videos", "Campaigns", "Visual stories"],
  },
  {
    id: "growth",
    title: "Growth & collaborations",
    footer: "Growth & Collaborations",
    icon: "growth",
    short: "Relevant brand partnerships and creator collaborations, with outcomes tracked.",
    long: "Relevant brand partnerships and creator collaborations, with outcomes tracked. We source, pitch and follow up so the right deals reach you.",
    chips: ["Brand partnerships", "Creator collabs", "Outreach", "Tracking"],
  },
] as const;

export const PLANS = [
  {
    key: "Basic",
    tier: "Essential",
    title: "Basic Video Editing",
    price: "₹49,990",
    blurb: "Clean, polished edits for your next video.",
    features: [
      "Clean cuts and intentional pacing",
      "Short-form or long-form editing",
      "Basic color correction",
      "Audio cleanup and music",
      "Simple captions and titles",
      "Platform-ready export",
      "1 round of revisions",
    ],
  },
  {
    key: "Advanced",
    tier: "Advanced",
    title: "Advanced Video Editing",
    price: "₹79,990",
    blurb: "For creators ready for a stronger visual story.",
    featured: true,
    features: [
      "Everything in Basic",
      "Story-driven pacing and hooks",
      "Professional color grading",
      "Layered sound design",
      "Motion graphics and captions",
      "Multi-format exports",
      "2 rounds of revisions",
    ],
  },
  {
    key: "Premium",
    tier: "Premium",
    title: "Premium Video Editing",
    price: "₹99,990",
    blurb: "A complete, premium post-production experience.",
    features: [
      "Everything in Advanced",
      "Custom motion graphics and VFX",
      "Cinematic color grading",
      "Premium sound design and mixing",
      "Advanced animated captions",
      "Priority workflow and delivery",
      "4 rounds of revisions",
    ],
  },
] as const;

export const BOOKING_SERVICES = [
  "Personal Branding & Creator Management",
  "Social Media Account Management",
  "Creative Production",
  "Growth & Collaborations",
  "Video Editing — Basic (₹49,990)",
  "Video Editing — Advanced (₹79,990)",
  "Video Editing — Premium (₹99,990)",
  "Not sure yet",
];

// Placeholder work items. Replace `src` with an image/video path in /public when real media is ready.
export type WorkCat = "reels" | "brand" | "campaigns" | "corporate";
export type Audience = "influencer" | "brand" | "corporate";
export type WorkItem = {
  title: string; client: string; cat: WorkCat; audience: Audience; tag: string; tagline: string; year: string;
  size?: "tall" | "wide"; px: string; py: string; src?: string; featured?: boolean;
};
export const WORK: WorkItem[] = [
  { title: "Creator Launch", client: "Influencer", cat: "reels", audience: "influencer", tag: "Reel", tagline: "From zero to recognisable", year: "2026", size: "tall", px: "20%", py: "15%", featured: true },
  { title: "Festive Drop", client: "Brand", cat: "campaigns", audience: "brand", tag: "Campaign", tagline: "Sold out by Sunday", year: "2026", px: "80%", py: "30%", featured: true },
  { title: "Founder Story", client: "Corporate", cat: "corporate", audience: "corporate", tag: "Film", tagline: "A face for the boardroom", year: "2026", px: "50%", py: "80%", featured: true },
  { title: "Rebrand Reveal", client: "Brand", cat: "brand", audience: "brand", tag: "Identity", tagline: "Same soul, sharper look", year: "2026", size: "wide", px: "70%", py: "10%", featured: true },
  { title: "Day in the Life", client: "Influencer", cat: "reels", audience: "influencer", tag: "Reel", tagline: "Ordinary, made unmissable", year: "2026", px: "10%", py: "60%" },
  { title: "Creator × Brand", client: "Collaboration", cat: "campaigns", audience: "influencer", tag: "Collab", tagline: "A partnership that fit", year: "2026", size: "tall", px: "40%", py: "40%", featured: true },
  { title: "Product Hero", client: "Brand", cat: "brand", audience: "brand", tag: "Ad", tagline: "Fifteen seconds of want", year: "2025", px: "90%", py: "90%" },
  { title: "Summit Recap", client: "Corporate", cat: "corporate", audience: "corporate", tag: "Event", tagline: "Three days in ninety seconds", year: "2025", px: "30%", py: "70%" },
  { title: "Travel Series", client: "Influencer", cat: "reels", audience: "influencer", tag: "Reel", tagline: "Postcards that move", year: "2025", px: "60%", py: "20%" },
  { title: "Launch Campaign", client: "Brand", cat: "campaigns", audience: "brand", tag: "Campaign", tagline: "Loud on day one", year: "2025", size: "wide", px: "15%", py: "85%" },
  { title: "Leadership Talk", client: "Corporate", cat: "corporate", audience: "corporate", tag: "Film", tagline: "Trust, on camera", year: "2025", px: "85%", py: "50%" },
  { title: "Visual Identity", client: "Artist", cat: "brand", audience: "influencer", tag: "Identity", tagline: "A look you can hear", year: "2025", px: "45%", py: "15%" },
];

// Platforms we grow brands on (shown as a wall, Preymaker-style)
export const PLATFORMS = [
  { name: "Instagram", kind: "Reels · Stories" },
  { name: "YouTube", kind: "Long-form · Shorts" },
  { name: "LinkedIn", kind: "Leadership · B2B" },
  { name: "Facebook", kind: "Community · Ads" },
  { name: "Meta Ads", kind: "Performance" },
  { name: "Google", kind: "Search · Ads" },
  { name: "WhatsApp", kind: "Broadcast · CRM" },
  { name: "Threads", kind: "Conversation" },
];

// Sample testimonials. Replace with real client quotes.
export const TESTIMONIALS = [
  { quote: "They understood my voice better than I did. My reels finally look like me, and brands started reaching out within two months.", name: "Sample Creator", role: "Lifestyle Influencer", initials: "SC" },
  { quote: "Our social channels went from irregular to consistent and on-brand. The monthly reports actually tell us what to do next.", name: "Sample Brand Lead", role: "D2C Brand", initials: "BL" },
  { quote: "The founder film they produced is now the first thing we send investors and new hires. Cinematic, clear and very us.", name: "Sample Director", role: "Corporate", initials: "SD" },
  { quote: "Fast turnarounds, sharp edits and hooks that hold. My average watch time jumped noticeably after the first month.", name: "Sample YouTuber", role: "Tech Creator", initials: "SY" },
  { quote: "They found collaborations that genuinely fit my audience instead of random deals. Every partnership felt natural.", name: "Sample Artist", role: "Musician", initials: "SA" },
  { quote: "Clear scope, clear pricing, no surprises. It feels like having an in-house content team without the overhead.", name: "Sample Founder", role: "Startup", initials: "SF" },
];

export const JOBS = [
  {
    title: "Video Editor",
    type: "Full-time",
    mode: "On-site / Hybrid",
    summary: "Cut reels, long-form videos and campaigns with sharp pacing, clean colour and sound that hooks.",
    points: ["Edit short-form and long-form content for creators and brands", "Colour grading, sound design and motion captions", "Comfortable with Premiere Pro, After Effects or DaVinci Resolve", "A portfolio of reels or edits you're proud of"],
  },
  {
    title: "Social Media Manager",
    type: "Full-time",
    mode: "Hybrid",
    summary: "Own content calendars, captions, publishing and community for a roster of creators and brands.",
    points: ["Plan and run monthly content calendars", "Write captions that sound like each client", "Track performance and prepare monthly reports", "Stay on top of platform trends and formats"],
  },
  {
    title: "Graphic Designer",
    type: "Full-time / Freelance",
    mode: "Remote / Hybrid",
    summary: "Design thumbnails, carousels, brand identities and campaign visuals that stop the scroll.",
    points: ["Social creatives, carousels and thumbnails", "Brand identity and visual systems", "Skilled in Figma, Photoshop or Illustrator", "Bonus: motion design experience"],
  },
];

export const waLink = (msg: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
