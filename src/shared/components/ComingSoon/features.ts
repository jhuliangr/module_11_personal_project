export type Feature = {
  slug: string;
  title: string;
  summary: string;
  details: string;
};

export const features: Feature[] = [
  {
    slug: "max-speed",
    title: "Max speed",
    summary: "Cap how fast particles are allowed to travel.",
    details:
      "Hard limit on per-particle velocity. Lower values keep motion calm and readable; higher values let particles whip across the surface and overshoot their targets for more chaotic trails.",
  },
  {
    slug: "softening",
    title: "Softening",
    summary: "Smooth out the pull near touch points.",
    details:
      "Softening factor added to the distance when computing attraction. Larger values keep the pull gentle even when a particle is right under your finger; smaller values produce sharper, more singular spikes near the touch.",
  },
  {
    slug: "wander-amp",
    title: "Wander amplitude",
    summary: "How far particles drift when left alone.",
    details:
      "Amplitude of the ambient wandering motion applied to every particle. Higher values give the field a livelier, more organic idle state; lower values let particles settle into stillness.",
  },
  {
    slug: "black-hole-omega",
    title: "Black hole omega",
    summary: "Spin speed of the black-hole swirl.",
    details:
      "Angular velocity used when a touch behaves as a black hole. Higher values spiral particles inward faster and create tighter vortices; lower values produce a slow, gravitational drift.",
  },
  {
    slug: "shape-spring",
    title: "Shape spring",
    summary: "Stiffness of the pull toward target shapes.",
    details:
      "Spring constant that drags particles toward their target shape position. Higher stiffness snaps the formation into place quickly; lower stiffness lets the shape emerge gradually with more give.",
  },
  {
    slug: "shape-friction",
    title: "Shape friction",
    summary: "Damping applied while shaping the field.",
    details:
      "Friction coefficient applied to particle velocity during shape formation. Values closer to 1 preserve momentum and let particles oscillate around their targets; lower values damp motion quickly for a crisp, settled shape.",
  },
];

export const featureBySlug = (slug: string): Feature | undefined =>
  features.find((feature) => feature.slug === slug);
