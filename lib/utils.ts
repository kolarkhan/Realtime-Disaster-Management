import { clsx, type ClassValue } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function titleCase(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getInitials(value: string) {
  return value
    .split(" ")
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");
}

export function parseCoordinates(lat?: string | number, lng?: string | number) {
  return {
    lat: typeof lat === "number" ? lat : Number.parseFloat(lat ?? "0"),
    lng: typeof lng === "number" ? lng : Number.parseFloat(lng ?? "0")
  };
}
