import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hantao Zhou",
  description: "Personal homepage",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/terminal.css@0.7.2/dist/terminal.min.css"
        />
      </head>
      <body className="terminal">
        {children}
      </body>
    </html>
  );
}
