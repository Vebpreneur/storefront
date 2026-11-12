import type { Seller } from "@spree/sdk";
import { ChevronRight, ArrowUpRight, ArrowDown, Globe2, ShieldCheck, Smartphone, Search } from "lucide-react";
import { affiliateEnabled, affiliateUrl } from "@/lib/affiliate/catalog";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SellerImage } from "@/components/ui/seller-image";

interface SellerHeaderProps {
  seller: Seller;
  basePath: string;
  locale: Locale;
}

/** Cover photo, logo, name, about text and policies of a seller profile. */
export async function SellerHeader({
  seller,
  basePath,
  locale,
}: SellerHeaderProps): Promise<React.JSX.Element> {
  const t = await getTranslations({ locale, namespace: "sellers" });
  const logo = seller.square_logo_url || seller.logo_url;
  const policies = (seller.policies ?? []).filter(
    (policy) => policy.body_html || policy.body,
  );

  if (affiliateEnabled()) {
    const outbound = affiliateUrl(seller.slug);
    const airalo = seller.slug === "airalo";
    return (
      <div className="provider-storefront" data-provider={seller.slug}>
        <div className="provider-hero">
          <div className="provider-hero-grid" aria-hidden="true" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Brödsmulor" className="provider-breadcrumb">
              <Link href={`${basePath}/sellers`}>Leverantörer</Link>
              <ChevronRight className="size-4" />
              <span>{seller.name}</span>
            </nav>
            <div className="provider-hero-layout">
              <div className="provider-hero-content">
                <div className="provider-brandlockup">
                  <span className="provider-brandlogo"><SellerImage src={logo} alt={seller.name} fill sizes="68px" className="object-contain p-2" /></span>
                  <span>{seller.name}</span>
                  <span className="provider-verified">LEVERANTÖR</span>
                </div>
                <p className="provider-hero-kicker">INTERNATIONELL UPPKOPPLING</p>
                <h1 className="provider-headline">{airalo ? "Airalo eSIM." : `${seller.name} eSIM.`}</h1>
                <p className="provider-hero-subtitle">Uppkoppling för nästa destination.</p>
                <p className="provider-intro">{airalo ? "Hitta eSIM för din nästa resa. Utforska destinationer och jämför aktuella datapaket direkt hos Airalo." : seller.about}</p>
                <div className="provider-hero-actions">
                  <a href="#seller-products" className="provider-primary-cta">Se destinationer <ArrowDown className="size-4" /></a>
                  {outbound && <a href={outbound} target="_blank" rel="sponsored noopener noreferrer" className="provider-secondary-cta">Till {seller.name} <ArrowUpRight className="size-4" /></a>}
                </div>
                <p className="provider-affiliate-note">Oberoende katalog. Länkar till leverantörer kan ge oss provision.</p>
              </div>
              <div className="provider-hero-image" aria-hidden="true">
                <SellerImage src={seller.cover_photo_url} alt="" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" priority />
                <span className="provider-image-label">{airalo ? "Upptäck destinationer världen över" : "Utforska utbudet"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="provider-features">
            <div className="provider-feature"><Globe2 className="size-5" /><div><strong>Resmål världen över</strong><span>Lokala, regionala och globala alternativ</span></div></div>
            <div className="provider-feature"><Smartphone className="size-5" /><div><strong>Enkelt med eSIM</strong><span>Digital uppkoppling utan fysiskt SIM-kort</span></div></div>
            <div className="provider-feature"><ShieldCheck className="size-5" /><div><strong>Direkt från leverantören</strong><span>Se priser och villkor hos {seller.name}</span></div></div>
          </div>
          {airalo && <div className="provider-discover">
            <div className="provider-collection-intro">
              <div><p className="provider-overline">AIRALO / DESTINATIONER</p><h2>Välj din destination</h2><p>Utforska Airalos eSIM-alternativ. Aktuella priser och villkor visas hos Airalo.</p></div>
            </div>
            <form action={`${basePath}/sellers/${seller.slug}`} method="GET" role="search" className="provider-search-form">
              <Search className="size-5" />
              <input name="q" type="search" className="provider-search-input" aria-label="Sök destination" placeholder="Sök land eller region" />
              <button type="submit">Sök <ArrowUpRight className="size-4" /></button>
            </form>
            <nav className="provider-quick-filters" aria-label="Filtrera destinationer">
              <Link href={`${basePath}/sellers/${seller.slug}`}>Alla destinationer</Link>
              <Link href={`${basePath}/sellers/${seller.slug}?option=countries`}>Länder</Link>
              <Link href={`${basePath}/sellers/${seller.slug}?option=regions`}>Regioner</Link>
              <Link href={`${basePath}/sellers/${seller.slug}?option=global`}>Globalt</Link>
            </nav>
          </div>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-48 bg-gray-100 sm:h-64">
        {seller.cover_photo_url && (
          <SellerImage
            src={seller.cover_photo_url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="pt-4">
          <ol className="flex items-center gap-1 text-sm text-gray-500">
            <li>
              <Link href={`${basePath}/sellers`} className="hover:underline">
                {t("allSellers")}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="text-gray-900">
              {seller.name}
            </li>
          </ol>
        </nav>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white sm:h-24 sm:w-24">
            <SellerImage
              src={logo}
              alt={t("logoAlt", { name: seller.name })}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {seller.name}
          </h1>
        </div>

        {(seller.about_html || seller.about) && (
          <section aria-labelledby="seller-about" className="mt-6 max-w-3xl">
            <h2 id="seller-about" className="sr-only">
              {t("about")}
            </h2>
            {seller.about_html ? (
              <div
                className="prose prose-gray"
                dangerouslySetInnerHTML={{ __html: seller.about_html }}
              />
            ) : (
              <p className="whitespace-pre-wrap text-gray-600">
                {seller.about}
              </p>
            )}
          </section>
        )}

        {policies.length > 0 && (
          <section aria-labelledby="seller-policies" className="mt-6 max-w-3xl">
            <h2
              id="seller-policies"
              className="text-sm font-medium text-gray-900"
            >
              {t("policies")}
            </h2>
            <div className="mt-2 divide-y divide-gray-200 border-y border-gray-200">
              {policies.map((policy) => (
                <details key={policy.id} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-gray-700 hover:text-gray-900">
                    {policy.name}
                    <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                  </summary>
                  {policy.body_html ? (
                    <div
                      className="prose prose-sm prose-gray mt-3"
                      dangerouslySetInnerHTML={{ __html: policy.body_html }}
                    />
                  ) : (
                    <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600">
                      {policy.body}
                    </p>
                  )}
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
