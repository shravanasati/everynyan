"use server"
import { headers } from "next/headers";

const rateLimitMap = new Map();

export default async function isRateLimited(limit: number, windowMs: number) {
  const headerList = headers()
  const ip = headerList.get("x-forwarded-for") || headerList.get("x-real-ip");

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return true;
  }

  ipData.count += 1;
  return false;

}