import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Portofolio Rafi",
  description: "Portofolio Rafi Maulana Firdaus — Designer, Developer, Creative.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Google+Sans+Text:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
