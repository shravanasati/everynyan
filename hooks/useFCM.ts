// src/hooks/useFCM.ts
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { saveFcmToken } from '@/lib/actions/saveToken';
const firebaseConfig = {
    apiKey: "AIzaSyDhumzKTSCsIFt-bo0qbLDRdn-Xd9fizEw",
    authDomain: "everynyan-a02ed.firebaseapp.com",
    projectId: "everynyan-a02ed",
    messagingSenderId: "221415288442",
    appId: "1:221415288442:web:bd4ad1e6953f71d50cd5c3",
};

const vapidKey = 'BLBkLskh_fDErG0RdVW5m2w2H1LH3jqX0jeqKOnz8JO6CfsciduZ23uqo3I5SSw6PWYhvKJaFdEZh17QV36y5Ow';

const useFCM = (token: string) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);
        const requestPermission = async () => {
            try {
                console.log("Reached here ")
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const fcm_token = await getToken(messaging, { vapidKey });
                    if (token) {
                        console.log(fcm_token)
                        saveFcmToken(token, fcm_token);
                    } else {
                        setError('No registration token available.');
                    }
                } else {
                    console.error('Notification permission denied.');
                }
            } catch (err) {
                console.error(`Error during permission request: ${err}`);
            }
        };

        requestPermission();

        onMessage(messaging, (payload) => {
            console.log('Foreground Message:', payload);
            // Handle foreground messages here
        });

        return () => {
            // Cleanup if necessary
        };
    }, []);

    return { token, error };
};

export default useFCM;
