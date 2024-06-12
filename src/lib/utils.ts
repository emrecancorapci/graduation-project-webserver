/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// @ts-expect-error swr
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export { fetcher };
