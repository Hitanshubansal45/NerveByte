import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata = {
  title: 'NerveByte Infotech Pvt Ltd | IT & Tech Consultancy',
  description: 'NerveByte Infotech Pvt Ltd is a premium IT and Tech Consultancy firm headquartered in New Delhi, India. Powering businesses worldwide with bespoke technology solutions, scalable system design, and software strategy.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://nervebyte.com',
  },
  openGraph: {
    title: 'NerveByte Infotech Pvt Ltd | IT & Tech Consultancy',
    description: 'Premium IT consultancy and bespoke tech strategy for scalable system design, custom software development, and digital transformation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NerveByte Infotech Pvt Ltd | IT & Tech Consultancy',
    description: 'Premium IT consultancy and scalable technology solutions.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" style={{ scrollBehavior: 'smooth' }}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
