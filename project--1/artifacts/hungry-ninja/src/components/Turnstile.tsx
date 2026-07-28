import { useEffect, useRef, useCallback } from "react";

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, opts: {
        sitekey: string;
        callback?: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function Turnstile({ siteKey, onVerify, onExpire, onError }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const loaded = useRef(false);

  const loadScript = useCallback(() => {
    if (document.getElementById("cf-turnstile-script")) return Promise.resolve();
    return new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => resolve(); // proceed anyway
      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadScript().then(() => {
      if (!containerRef.current || loaded.current) return;
      const tf = window.turnstile;
      if (!tf) return;
      loaded.current = true;
      widgetId.current = tf.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "expired-callback": onExpire,
        "error-callback": onError,
        theme: "dark",
      });
    });
    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [siteKey, onVerify, onExpire, onError, loadScript]);

  return <div ref={containerRef} />;
}
