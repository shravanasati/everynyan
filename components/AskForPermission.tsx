"use client";

import useFCM from "@/hooks/useFCM";

interface AskForNotificationProps {
  token: string;
}

export function AskForNotification({ token }: AskForNotificationProps) {
  const { error } = useFCM(token);

  return (
    <div className="hidden">
      {error ? "There is an error in getting permission" : "Connecting..."}
    </div>
  );
}
