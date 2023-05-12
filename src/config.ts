export const config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  MODE: process.env.NODE_ENV,
  GOOGLE_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXAUTH_SECRET,
  FACEBOOK_ID: process.env.FACEBOOK_CLIENT_ID,
  FACEBOOK_SECRET: process.env.FACEBOOK_CLIENT_SECRET
};

export const WINDOW_SSO = (path: string) => {
  const w = 600;
  const h = 600;
  const left = window.screen.width / 2 - w / 2;
  const top = window.screen.height / 2 - h / 2;
  const specs = `width=${w},height=${h},top=${top},left=${left}`;
  window.open(config.API_URL + path, '_blank', specs);
};