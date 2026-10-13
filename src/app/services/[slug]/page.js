import { SERVICES, SERVICE_CATEGORIES, getAllServiceSlugs, getServiceBySlug, getRelatedServices, getCategoryById } from '../../../data/servicesData';
import ServicePageClient from './ServicePageClient';

// Generate static params for all service pages
export function generateStaticParams() {
  return getAllServiceSlugs();
}

// Generate unique metadata for each service page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found | NerveByte Infotech',
      description: 'The requested service page could not be found.',
    };
  }

  const category = getCategoryById(service.category);

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://nervebyte.com/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
      url: `https://nervebyte.com/services/${service.slug}`,
      siteName: 'NerveByte Infotech',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.metaTitle,
      description: service.metaDescription,
    },
    other: {
      'service:category': category?.title || '',
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-headline)] text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="text-on-surface-variant mb-6">The requested service page could not be found.</p>
          <a href="/services" className="text-primary hover:underline">View all services</a>
        </div>
      </div>
    );
  }

  const category = getCategoryById(service.category);
  const relatedServicesData = getRelatedServices(service.relatedServices);

  // JSON-LD Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "NerveByte Infotech Pvt Ltd",
      "url": "https://nervebyte.com",
    },
    "serviceType": service.title,
    "areaServed": "Worldwide",
    "url": `https://nervebyte.com/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServicePageClient
        service={service}
        categoryTitle={category?.title || ''}
        relatedServices={relatedServicesData}
      />
    </>
  );
}
