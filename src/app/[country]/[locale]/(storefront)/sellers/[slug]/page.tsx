import type { Metadata } from "next";
import { Globe2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProductListing } from "@/components/products/ProductListing";
import { SellerHeader } from "@/components/sellers/SellerHeader";
import { resolveCurrency } from "@/lib/data/markets";
import { getProductFilters } from "@/lib/data/products";
import { getSeller, getSellerProducts } from "@/lib/data/sellers";
import { buildHreflangLanguages } from "@/lib/metadata/alternates";
import { buildCanonicalUrl } from "@/lib/seo";
import { isMarketplaceEnabled } from "@/lib/spree";
import { getStoreUrl } from "@/lib/store";
import { parseListingSearchParams } from "@/lib/utils/listing-search-params";

/** Same expand list for page and metadata so both share one cache entry. */
const SELLER_PAGE_EXPAND = ["policies"];

interface SellerPageProps {
  params: Promise<{ country: string; locale: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
}: SellerPageProps): Promise<Metadata> {
  if (!isMarketplaceEnabled()) return {};
  const { country, locale, slug } = await params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "sellers",
  });

  const seller = await getSeller(
    slug,
    { expand: SELLER_PAGE_EXPAND },
    { country, locale },
  );
  if (!seller) return { title: t("sellerNotFound") };

  const title = seller.name;
  const description =
    seller.about?.slice(0, 160) || t("metaDescription", { name: seller.name });
  const image = seller.cover_photo_url || seller.logo_url;
  const path = `/sellers/${seller.slug}`;
  const storeUrl = getStoreUrl();
  const canonicalUrl = storeUrl
    ? buildCanonicalUrl(storeUrl, `/${country}/${locale}${path}`)
    : undefined;
  const languages = storeUrl
    ? await buildHreflangLanguages({ storeUrl, country, locale, path })
    : undefined;

  return {
    title,
    description,
    ...(canonicalUrl
      ? {
          alternates: {
            canonical: canonicalUrl,
            ...(languages ? { languages } : {}),
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      type: "website",
      ...(image ? { images: [{ url: image, alt: seller.name }] } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function SellerPage({
  params,
  searchParams,
}: SellerPageProps): Promise<React.JSX.Element> {
  // The layout gates this too, but layout and page render in parallel.
  if (!isMarketplaceEnabled()) notFound();
  const { country, locale, slug } = await params;
  const [rawSearchParams, seller, currency, t] = await Promise.all([
    searchParams,
    getSeller(slug, { expand: SELLER_PAGE_EXPAND }, { country, locale }),
    resolveCurrency(country),
    getTranslations({ locale: locale as Locale, namespace: "sellers" }),
  ]);

  // The 404 status comes from the proxy's existence check; this is the
  // fallback for a seller that disappears between that check and the render.
  if (!seller) notFound();

  const basePath = `/${country}/${locale}`;
  const listingState = parseListingSearchParams(rawSearchParams);

  // Pre-bind the seller ID so the client InfiniteProductList island gets a
  // single-arg fetcher; `.bind()` on a server action serializes across the
  // server→client boundary where an inline closure would not.
  const fetchSellerProducts = getSellerProducts.bind(null, seller.id);

  return (
    <div className="pb-8">
      <SellerHeader
        seller={seller}
        basePath={basePath}
        locale={locale as Locale}
      />

      <section
        aria-labelledby="seller-products"
        className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10"
      >
        <h2
          id="seller-products"
          className="mb-4 text-xl font-semibold text-gray-900"
        >
          {t("products")}
        </h2>
        <ProductListing
          state={listingState}
          basePath={basePath}
          currency={currency}
          locale={locale as Locale}
          listId={`seller-${seller.id}`}
          listName={`Seller: ${seller.name}`}
          baseParams={{ seller_id_eq: seller.id }}
          fetchProducts={fetchSellerProducts}
          fetchFilters={getProductFilters}
          emptyMessage={t("noProducts")}
        />
      </section>
      {seller.slug === "airalo" && (
        <section className="provider-faq mt-16" aria-labelledby="airalo-faq-title">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
              <div>
                <p className="provider-overline"><Globe2 className="size-4" /> BRA ATT VETA</p>
                <h2 id="airalo-faq-title" className="provider-faq-heading mt-4">Frågor om<br />Airalo eSIM.</h2>
                <p className="mt-5 text-sm leading-7 text-[#66766a] max-w-sm">Hitta rätt uppkoppling inför resan. När du valt destination kan du jämföra aktuella paket direkt på Airalos webbplats.</p>
                <Link href={`${basePath}/products`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#196c55] hover:text-[#104d3c]">Utforska alla destinationer <ExternalLink className="size-4" /></Link>
              </div>
              <div>
                <details><summary>Vad är ett eSIM?</summary><p>Ett eSIM är ett digitalt SIM som kan aktiveras på en kompatibel mobil utan att du behöver sätta i ett fysiskt SIM-kort. Kontrollera att din enhet stöder eSIM innan du väljer ett paket.</p></details>
                <details><summary>Hur väljer jag rätt Airalo-paket?</summary><p>Börja med resmålet. Jämför sedan datapott, giltighetstid, täckning och eventuella begränsningar på Airalos webbplats. Vi visar destinationer här, men de aktuella abonnemangsvillkoren hittar du hos leverantören.</p></details>
                <details><summary>Kan jag använda Airalo i flera länder?</summary><p>Airalo erbjuder lokala, regionala och globala eSIM-alternativ. Vilka länder som ingår beror på paketet. Kontrollera täckningslistan för det specifika alternativ du väljer.</p></details>
                <details><summary>Vem hanterar min beställning och support?</summary><p>Du genomför köp och installation hos Airalo. Airalo ansvarar för sina produkter, betalningsvillkor och support. Vår marknadsplats hjälper dig hitta destinationer och komma vidare till leverantören.</p></details>
                <details><summary>Varför skickas jag vidare till Airalo?</summary><p>Vi är en fristående affiliatemarknadsplats, inte återförsäljare av Airalos eSIM. Länkar kan ge oss provision, utan att vi lägger på ett eget pris.</p></details>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
