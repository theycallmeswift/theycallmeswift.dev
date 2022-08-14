export const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string;

export const trackPageview = (url: string) => {
  window.gtag("config", gaId, { page_path: url });
};

export const trackEvent = (action: string, params?: Gtag.EventParams) => {
  window.gtag("event", action, params);
};
