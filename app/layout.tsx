import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'محاكي — اتخذ قرارك وأنت ترى المستقبل',
  description: 'منصة محاكي تحوّل بياناتك المالية إلى إجابات. اسأل بأي سؤال "ماذا لو"، واحصل على توقع دقيق لتأثيره على إيراداتك وأرباحك.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="bg-background scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
