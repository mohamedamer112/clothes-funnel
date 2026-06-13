import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "عروض حصرية - متجر الأناقة",
  description: "احصل على أحدث صيحات الموضة بأفضل الأسعار",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
