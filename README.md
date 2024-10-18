# everynyan

everynyan is a social media website which focuses heavily on anonymity and exclusivity.

### Setting up the local development environment

everynyan is built using Next.js.

1. Clone the repository.

```
git clone https://github.com/shravanasati/everynyan.git
```
2. Create a `.env.local` file.

```
SECRET_KEY=
RESEND_API_KEY=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=
```

The secret key is used to encrypt the cookies on user's browser. You can create one using the following command.

```sh
python -c "import secrets;print(secrets.token_hex(32))"
```

Sign up and create an account on [Resend](https://resend.com), verify your domain and obtain an API key.

You also need to create a project on [Firebase](https://console.firebase.google.com), enable Firestore and store those credentials in env file as well.


3. Install all the dependencies.

```
pnpm i
```

4. Run the development server.

```
pnpm dev
```


### Contribution

everynyan is open to contributions. If you wish to contribute, follow the above instructions to setup your development environment, but make sure to clone your forked copy.
