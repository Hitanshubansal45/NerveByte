"use client";

import ServicePageHero from '../../../components/services/ServicePageHero';
import ServiceOverview from '../../../components/services/ServiceOverview';
import ServiceFeatureGrid from '../../../components/services/ServiceFeatureGrid';
import ServiceProcess from '../../../components/services/ServiceProcess';
import ServiceBenefits from '../../../components/services/ServiceBenefits';
import ServiceFAQ from '../../../components/services/ServiceFAQ';
import ServiceCTA from '../../../components/services/ServiceCTA';
import RelatedServices from '../../../components/services/RelatedServices';

export default function ServicePageClient({ service, categoryTitle, relatedServices }) {
  return (
    <>
      <ServicePageHero
        title={service.title}
        tagline={service.heroTagline}
        category={categoryTitle}
      />
      <ServiceOverview description={service.description} />
      <ServiceFeatureGrid features={service.features} title={`${service.title} Capabilities`} />
      <ServiceProcess steps={service.processSteps} />
      <ServiceBenefits benefits={service.benefits} />
      <ServiceFAQ faqs={service.faqs} serviceName={service.title} />
      <RelatedServices services={relatedServices} />
      <ServiceCTA />
    </>
  );
}
