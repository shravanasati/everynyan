interface FirebaseConfig {
  type: string | undefined;
  projectId: string | undefined;
  privateKeyID: string | undefined;
  privateKey: string | undefined;
  clientEmail: string | undefined;
  clientID: string | undefined;
  authURI: string | undefined;
  tokenURI: string | undefined;
  authProviderX509CertURL: string | undefined;
  clientX509CertURL: string | undefined;
  universeDomain: string | undefined;
}

const config: FirebaseConfig = {
  type: "service_account",
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKeyID: process.env.FIREBASE_PRIVATE_KEY_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  clientID: process.env.FIREBASE_CLIENT_ID,
  authURI: process.env.FIREBASE_AUTH_URI,
  tokenURI: process.env.FIREBASE_TOKEN_URI,
  authProviderX509CertURL: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertURL: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universeDomain: process.env.FIREBASE_UNIVERSE_DOMAIN,
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