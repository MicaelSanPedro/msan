"use client";

import dynamic from "next/dynamic";

const BokehParticles = dynamic(
  () => import("./BokehParticles").then((m) => ({ default: m.BokehParticles })),
  { ssr: false }
);

export function LazyBokehParticles() {
  return <BokehParticles />;
}
