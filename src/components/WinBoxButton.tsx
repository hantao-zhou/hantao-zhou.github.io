'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    WinBox?: any;
  }
}

type WinBoxButtonProps = {
  label?: string;
  title?: string;
  html?: string;
  options?: Record<string, unknown>;
};

export default function WinBoxButton({
  label = 'Open Window',
  title = 'About',
  html = '<p>This window is created with WinBox.js.</p>',
  options = {},
}: WinBoxButtonProps) {
  const [ready, setReady] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    // Load WinBox only on the client, once
    if (typeof window === 'undefined') return;
    if (window.WinBox) {
      setReady(true);
      return;
    }
    if (loadingRef.current) return;
    loadingRef.current = true;

    const existing = document.querySelector(
      'script[data-winbox="true"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => setReady(true));
      return;
    }

    const script = document.createElement('script');
    // Use the bundled build path (correct URL) so WinBox attaches to window
    script.src =
      'https://unpkg.com/winbox@0.2.82/dist/winbox.bundle.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-winbox', 'true');
    script.onload = () => setReady(true);
    script.onerror = () => {
      // Keep UI usable even if CDN fails
      setReady(false);
      loadingRef.current = false;
    };
    document.body.appendChild(script);
  }, []);

  const openWindow = useCallback(() => {
    if (!window.WinBox) return;
    // Avoid non-deterministic values during render: call only on click
    // @ts-ignore - provided by the loaded script
    new window.WinBox(title, {
      html,
      x: 'center',
      y: 'center',
      ...options,
    });
  }, [title, html, options]);

  return (
    <button onClick={openWindow} disabled={!ready}>
      {ready ? label : 'Loading Window Manager…'}
    </button>
  );
}
