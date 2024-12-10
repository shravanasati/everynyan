"use client";
import {
	isNotificationSupported,
	isPermissionDenied,
	isPermissionGranted,
	registerAndSubscribe,
  sendSubscriptionToServer
} from "@/lib/NotificationsPush";
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface NotificationContextType {
	isSupported: boolean;
	isSubscribed: boolean;
	isGranted: boolean;
	isDenied: boolean;
	subscription: PushSubscription | null;
	errorMessage: string | null;
	handleSubscribe: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isSupported, setIsSupported] = useState<boolean>(false);
	const [isGranted, setIsGranted] = useState<boolean>(false);
	const [isDenied, setIsDenied] = useState<boolean>(false);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
	const [subscription, setSubscription] = useState<PushSubscription | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		if (isNotificationSupported()) {
			setIsSupported(true);
			const granted = isPermissionGranted();
			setIsGranted(granted);
			setIsDenied(isPermissionDenied());
			if (granted) {
				handleSubscribe();
			}
		}
	}, []);

	const handleSubscribe = () => {
		const onSubscribe = (subscription: PushSubscription | null) => {
			if (subscription) {
				setIsSubscribed(true);
				setSubscription(subscription);

        let retryCount = 0
        while (retryCount < 5) {
          try {
            sendSubscriptionToServer(subscription)
            break
          } catch (e) {
            console.error(e)
            retryCount += 1
          }
        }

			}
			setIsGranted(isPermissionGranted());
			setIsDenied(isPermissionDenied());
		};
		const onError = (e: Error) => {
			console.error("Failed to subscribe cause of: ", e);
			setIsGranted(isPermissionGranted());
			setIsDenied(isPermissionDenied());
			setIsSubscribed(false);
			setErrorMessage(e?.message);
		}
		registerAndSubscribe(onSubscribe, onError);
	};

	const contextValue = useMemo(
		() => ({
			isSupported,
			isSubscribed,
			isGranted,
			isDenied,
			subscription,
			errorMessage,
			handleSubscribe,
		}),
		[isSupported, isSubscribed, isGranted, isDenied, subscription, errorMessage]
	);

	return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>;
};

export const useNotification = (): NotificationContextType => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}
	return context;
};