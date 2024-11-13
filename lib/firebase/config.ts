interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
}


const config: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// When deployed, there are quotes that need to be stripped
Object.keys(config).forEach((key) => {
  const configKey = key as keyof FirebaseConfig;
  const configValue = config[configKey] + "";
  if (configValue.charAt(0) === '"') {
    config[configKey] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;