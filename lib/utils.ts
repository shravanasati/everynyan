import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FirestoreTimestamp } from "@/components/SecurityLogs";
import { parseISO } from "date-fns"
import { toZonedTime, format } from "date-fns-tz"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uniEmailRegex = /^[a-z]+\.(cse|ict|cie)(2[2-3])@adaniuni\.ac\.in$/;

export function isValidEmail(email: string) {
  return uniEmailRegex.test(email);
}

export function getNameFromEmail(email: string) {
  return email.split(".")[0];
}

export const isBrowser = (): boolean => {
  return typeof window !== 'undefined'
}

export const nextLocalStorage = (): Storage | void => {
  if (isBrowser()) {
    return window.localStorage
  }
}

export const generateOTP = (): number => {
  return Math.floor(100000 + Math.random() * 900000);
}

// generate a random 6 digit alphanumeric string
export function generatePostID() {
  return Math.random().toString(36).substring(2, 8);
}

// generate a random 8 digit alphanumeric string
export function generateCommentID() {
  return Math.random().toString(36).substring(2, 10);
}

export function getPostSlug(id: string, title: string) {
  return `${title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20)}_${id}`;
}

export function convertTimestamp(timestamp: FirestoreTimestamp): string {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString()
}

export const formatDate = (timestamp: string) => {
  const date = parseISO(timestamp)
  const istDate = toZonedTime(date, 'Asia/Kolkata')
  return format(istDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Asia/Kolkata' })
}