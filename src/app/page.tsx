'use client';

import Script from 'next/script';

export default function Home() {
  const openWindow = () => {
    // @ts-expect-error winbox global
    new WinBox('About', {
      html: '<p>This window is created with WinBox.js.</p>',
      x: 'center',
      y: 'center',
    });
  };

  return (
    <main className="container">
      <h1>Hantao Zhou</h1>
      <p>Welcome to my personal homepage.</p>
      <button onClick={openWindow}>Open Window</button>
      <Script src="https://unpkg.com/winbox@0.2.82/dist/js/winbox.bundle.min.js" strategy="afterInteractive" />
    </main>
  );
}
