import { clsx, type ClassValue } from "clsx";

/** Tiny class-name combiner. Tailwind v4 handles dedupe at build, so clsx is enough here. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
