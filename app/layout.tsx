import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/auth-context';
import { NotificationProvider } from '@/lib/notification-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BloodBridge - Connecting Donors, Saving Lives',
  description: 'Connect blood donors with those in urgent need. Join our community-driven network for faster, smarter, and life-saving blood donation connections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NotificationProvider>
            {children}
            <Toaster />
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}