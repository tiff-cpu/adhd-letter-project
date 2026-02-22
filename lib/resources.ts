export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileName: string;
};

export const resources: Resource[] = [
  {
    id: "is-this-your-brain-too",
    title: "Is This Your Brain Too?",
    description:
      "Not a quiz. No score. Just a list of things that might sound familiar. If they do — you're not broken.",
    category: "Recognition",
    fileUrl: "/resources/is-this-your-brain-too.pdf",
    fileName: "is-this-your-brain-too.pdf",
  },
  {
    id: "7-things-nobody-told-you",
    title: "7 Things Nobody Told You About Your ADHD Brain",
    description:
      "The science behind the patterns — why you're cyclical, why time disappears, why 'just try harder' has never worked.",
    category: "Understanding",
    fileUrl: "/resources/7-things-nobody-told-you.pdf",
    fileName: "7-things-nobody-told-you.pdf",
  },
  {
    id: "20-minutes-of-honesty",
    title: "20 Minutes of Honesty",
    description:
      "Journal prompts for the stuff underneath — not gratitude, not productivity, the real stuff. Pick one section. Set a timer.",
    category: "Integration",
    fileUrl: "/resources/20-minutes-of-honesty.pdf",
    fileName: "20-minutes-of-honesty.pdf",
  },
  {
    id: "small-experiments",
    title: "Small Experiments for ADHD Brains",
    description:
      "11 micro-experiments matched to your energy level. No schedule. No guilt. Pick one, set a timer, try it once.",
    category: "Experimentation",
    fileUrl: "/resources/small-experiments.pdf",
    fileName: "small-experiments.pdf",
  },
  {
    id: "adhd-cheat-sheet",
    title: "The ADHD Cheat Sheet for People Who Work With Me",
    description:
      "A guide you can hand to a coworker, boss, partner, or friend. It starts the conversation you don't know how to start.",
    category: "Communication",
    fileUrl: "/resources/adhd-cheat-sheet.pdf",
    fileName: "adhd-cheat-sheet.pdf",
  },
];
