import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/servicesData';
import ServicesIndexClient from './ServicesIndexClient';

export const metadata = {
  title: 'IT Services & Solutions | NerveByte Infotech',
  description: 'Explore NerveByte\'s comprehensive IT services: Cloud Strategy, Cybersecurity, Staff Augmentation, Quality Assurance, Full Stack Development, AI, Data Analytics, and Business Intelligence.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://nervebyte.com/services',
  },
  openGraph: {
    title: 'IT Services & Solutions | NerveByte Infotech',
    description: 'Explore NerveByte\'s comprehensive IT services portfolio covering consulting, development, testing, and digital transformation.',
    type: 'website',
    url: 'https://nervebyte.com/services',
    siteName: 'NerveByte Infotech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT Services & Solutions | NerveByte Infotech',
    description: 'Comprehensive IT services portfolio from NerveByte Infotech.',
  },
};

export default function ServicesPage() {
  // Build categories with their services for the client component
  const categoriesWithServices = SERVICE_CATEGORIES.map(category => ({
    ...category,
    services: getServicesByCategory(category.id),
  }));

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "NerveByte IT Services",
    "description": "Comprehensive IT services and solutions by NerveByte Infotech",
    "numberOfItems": categoriesWithServices.reduce((sum, cat) => sum + cat.services.length, 0),
    "itemListElement": categoriesWithServices.flatMap((cat, catIndex) =>
      cat.services.map((service, serviceIndex) => ({
        "@type": "ListItem",
        "position": catIndex * 10 + serviceIndex + 1,
        "item": {
          "@type": "Service",
          "name": service.title,
          "description": service.metaDescription,
          "url": `https://nervebyte.com/services/${service.slug}`,
          "provider": {
            "@type": "Organization",
            "name": "NerveByte Infotech Pvt Ltd",
          },
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <ServicesIndexClient categories={categoriesWithServices} />
    </>
  );
}
