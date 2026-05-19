import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLLYUE Portfolio",
  description: "Personal Concept Project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/ss-broad" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
