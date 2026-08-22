"use client";

import { useId } from "react";

/* ─── Physical 3D Toggle Slider ───
   3 variants: v1 (dual-dot), v2 (channel), v3 (morph pill)
   All adapted to the TechMate liquid glass emerald design system.
   Original concept: compass/css3 physical sliders → converted to
   pure CSS with glassmorphism + emerald accent. ────────────────────── */

type SliderVariant = "v1" | "v2" | "v3";

interface ToggleSliderProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  variant?: SliderVariant;
  "aria-label"?: string;
}

export function ToggleSlider({
  checked,
  onChange,
  variant = "v3",
  "aria-label": ariaLabel,
}: ToggleSliderProps) {
  const id = useId();

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-input"
        aria-label={ariaLabel}
      />
      <label
        htmlFor={id}
        className={`toggle-track toggle-${variant}`}
        aria-hidden="true"
      />
    </>
  );
}
