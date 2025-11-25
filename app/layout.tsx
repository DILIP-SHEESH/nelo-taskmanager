import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nelo Task Manager",
  description: "Task Manager Assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}