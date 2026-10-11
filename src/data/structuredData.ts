/**
 * Schema.org JSON-LD for the homepage.
 *
 * Offers are generated from `pricingPlans` (data/content.ts) so the structured
 * data can never drift from the prices shown on the Pricing page. Only add
 * properties that are visible and true on the site: no ratings or reviews until
 * real, displayed customer reviews exist (Google review-snippet policy).
 */
import { pricingPlans } from './content';
import { SITE } from './seo';

const ORG_ID = `${SITE}/#organization`;
const WEBSITE_ID = `${SITE}/#website`;

/** "$20" → "20"; "$0" → "0". */
function priceValue(price: string): string {
  const n = price.replace(/[^0-9.]/g, '');
  if (!n) throw new Error(`structuredData: cannot read a price from "${price}"`);
  return n;
}

export function homeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'ChurchGeniusPro',
        url: `${SITE}/`,
        logo: `${SITE}/logo.png`,
        email: 'support@churchgeniuspro.com',
        sameAs: ['https://www.youtube.com/@ChurchGeniusPro'],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'ChurchGeniusPro',
        url: `${SITE}/`,
        publisher: { '@id': ORG_ID },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'ChurchGeniusPro',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Church management software',
        operatingSystem: 'Web',
        description:
          'All-in-one church management software with a built-in AI assistant: membership, attendance, giving, accounting and payroll, events, Sunday School, kids check-in, and communication.',
        url: `${SITE}/`,
        publisher: { '@id': ORG_ID },
        offers: pricingPlans.map((plan) => ({
          '@type': 'Offer',
          name: plan.name,
          price: priceValue(plan.price),
          priceCurrency: 'USD',
          url: `${SITE}/pricing`,
          // Monthly price, only for paid plans billed per month.
          ...(plan.period === 'month' &&
            priceValue(plan.price) !== '0' && {
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: priceValue(plan.price),
                priceCurrency: 'USD',
                unitCode: 'MON',
                referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
              },
            }),
        })),
      },
    ],
  };
}

/** Serialize for a <script type="application/ld+json"> tag (escapes "</"). */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
