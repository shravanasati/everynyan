# EveryNyan

[EveryNyan](https://everynyan.tech) is a social media website which focuses heavily on anonymity and exclusivity.

### Setting up the local development environment

EveryNyan is built using Next.js.

1. Clone the repository.

```
git clone https://github.com/shravanasati/everynyan.git
```
2. Create a `.env.local` file in the project root.

```
SECRET_KEY
RESEND_API_KEY
DISCORD_WEBHOOK_URL
FIREBASE_STORAGE_BUCKET
FIREBASE_PROJECT_ID
FIREBASE_PRIVATE_KEY_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
FIREBASE_CLIENT_ID
FIREBASE_AUTH_URI
FIREBASE_TOKEN_URI
FIREBASE_AUTH_PROVIDER_X509_CERT_URL
FIREBASE_CLIENT_X509_CERT_URL
FIREBASE_UNIVERSE_DOMAIN
GIPHY_API_KEY
MODERATOR_EMAILS
SALT
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_BASE_URL
NEXT_PUBLIC_NOTIFICATIONS_SERVER_ADDRESS
NOTIFICATIONS_API_KEY
```

The secret key is used to encrypt the cookies on user's browser. You can create one using the following command.

```sh
python -c "import secrets;print(secrets.token_hex(32))"
```
Moderator emails is a comma-separated list of emails of users who have moderation privileges.

Sign up and create an account on [Resend](https://resend.com), verify your domain and obtain an API key.

Create a discord server and create a channel and obtain webhook url from Channel Setting > Integrations

Sign in at [GIPHY](https://giphy.com) to obtain a an API Key
  

You also need to create a project on [Firebase](https://console.firebase.google.com), enable Firestore. Then go to the Project Settings > Service Accounts > Generate a private key.

Download the generated JSON file, and extract the keys and store them in the `.env.local` file. Also note the `FIREBASE_STORAGE_KEY` and `FIREBASE_PROJECT_ID` configuration.

`DISCORD_WEBHOOK_URL` is used to notify the admins when a new report is published. Get it from the channel settings > webhook URL.

The last set of configuration you'd need is for the Cloudflare Turnstile captcha. Go to the [Cloudflare dashboard](https://dash.cloudflare.com), and create a new Turnstile widget in managed mode, add `localhost` in the list of allowed hostnames. Finally store the site key and secret key in the `.env.local` file.


3. Install all the dependencies.

```
pnpm i
```

4. Run the development server.

```
pnpm dev
```

### Related Repositories

| Name  | Description |
|---|---|
| [everynyan-notification-service](https://github.com/shravanasati/everynyan-notification-service)  | Notification service responsible for delivery of realtime in-app and push notifications.  |
| [everynyan-moderation-service](https://github.com/shravanasati/everynyan-moderation-service)  | Automatic content moderation service for everynyan.  |


### Contribution

EveryNyan is open to contributions. If you wish to contribute, follow the above instructions to setup your development environment, but make sure to clone your forked copy.
