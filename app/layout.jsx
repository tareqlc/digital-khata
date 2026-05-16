import './globals.css';

export const metadata = {
  title: 'ডিজিটাল খাতা',
  description: 'ব্যবসা চালান সহজে',
  manifest: '/manifest.json',
  themeColor: '#CC0000',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <div style={{ background: '#f0f0f0', minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
