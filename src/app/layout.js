import './globals.css';

export const metadata = {
  title: 'Incoming Call',
  description: 'Create fake incoming calls',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export const viewport = {
  viewportFit: "cover",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black-translucent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}