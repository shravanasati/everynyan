import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function getPostSlug(id: string, title: string) {
  return `${title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 20)}_${id}`;
}

export interface PostData {
  title: string;
  content: string;
  board: string;
  upVotes: number;
  downVotes: number;
  noOfComments: number;
}