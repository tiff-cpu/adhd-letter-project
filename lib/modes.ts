export const MODES = [
  { value: "overwhelm", label: "Overwhelm", description: "everything is too much right now" },
  { value: "shame", label: "Shame Spiral", description: "I feel broken / lazy / like a failure" },
  { value: "rsd", label: "RSD", description: "rejection hit me like a truck" },
  { value: "burnout", label: "Burnout", description: "I have nothing left to give" },
  { value: "lonely", label: "Lonely", description: "nobody in my life gets it" },
  { value: "masking", label: "Masking Fatigue", description: "I'm exhausted from pretending to be normal" },
  { value: "executive", label: "Executive Dysfunction", description: "I know what to do, I just can't make myself do it" },
  { value: "latediagnosis", label: "Late Diagnosis Grief", description: "I'm mourning the years I didn't know" },
] as const;

export type Mode = (typeof MODES)[number]["value"];
