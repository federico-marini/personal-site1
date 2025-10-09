import { twMerge } from "tailwind-merge";

export function cn(
  ...inputs: Array<string | undefined | null | false>
): string {
  return twMerge(inputs.filter(Boolean).join(" "));
}

/**
 * Non-negative clamp utility for animation thresholds and progress values.
 */
export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}


