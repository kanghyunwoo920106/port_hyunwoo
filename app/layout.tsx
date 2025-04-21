import "./globals.css";
import { Inter } from "next/font/google";
import ClientLayout from '../components/client-layout';

const inter = Inter({ subsets: ["latin"] });

// 별도 파일로 분리한 메타데이터
export { metadata } from './metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
