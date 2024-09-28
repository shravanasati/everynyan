import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const uniEmailRegex = /^[a-zA-Z]+\.(cse|ict|cie)(2[2-9]|30)@adaniuni\.ac\.in$/;

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