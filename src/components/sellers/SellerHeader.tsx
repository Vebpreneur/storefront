import type { Seller } from "@spree/sdk";
import { ChevronRight, ArrowUpRight, ArrowDown, Globe2, Wifi, ShieldCheck, MapPin, Smartphone, Sparkles } from "lucide-react";
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
    const isAiralo = seller.slug === "airalo";
    const outbound = affiliateUrl(seller.slug);
    return (
      <div className="provider-storefront" data-provider={seller.slug}>
        <div className="provider-hero">
          <div className="provider-hero-mesh" aria-hidden="true" />
          <div className="provider-hero-glow" aria-hidden="true" />
          <div className="provider-hero-orbit provider-hero-orbit-one" aria-hidden="true" />
          <div className="provider-hero-orbit provider-hero-orbit-two" aria-hidden="true" />
          <div className="provider-hero-inner container mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Brödsmulor" className="provider-breadcrumb">
              <Link href={`${basePath}/sellers`} className="hover:text-white transition-colors">Alla leverantörer</Link>
              <ChevronRight className="size-4 opacity-50" />
              <span aria-current="page" className="text-white">{seller.name}</span>
            </nav>
            <div className="provider-hero-layout">
              <div className="relative z-10 max-w-3xl">
                <div className="provider-hero-eyebrow">
                  <span className="provider-status-dot" />
                  <span>ESIM-LEVERANTÖR</span>
                  <span className="provider-eyebrow-divider" />
                  <Globe2 className="size-3.5" />
                  <span>Resor utan gränser</span>
                </div>
                <div className="provider-brandlockup">
                  <span className="provider-brandlogo">
                    <SellerImage src={logo} alt={t("logoAlt", { name: seller.name })} fill sizes="76px" className="object-contain p-3" />
                  </span>
                  <span className="provider-brand-name">{seller.name}</span>
                </div>
                <h1 className="provider-headline">
                  {isAiralo ? <>Världen väntar.<br /><span>Håll dig uppkopplad.</span></> : <>Din resa.<br /><span>Din uppkoppling.</span></>}
                </h1>
                <p className="provider-intro">
                  {isAiralo
                    ? "Upptäck Airalos eSIM för länder, regioner och globala äventyr. Hitta en destination här och välj ditt datapaket hos Airalo."
                    : seller.about || `Utforska eSIM och reseuppkoppling hos ${seller.name}.`}
                </p>
                <div className="provider-hero-actions">
                  <a className="provider-primary-cta" href="#seller-products">
                    Utforska destinationer <ArrowDown className="size-[18px]" />
                  </a>
                  {outbound && <a className="provider-secondary-cta" href={outbound} target="_blank" rel="sponsored noopener noreferrer">
                    Besök {seller.name} <ArrowUpRight className="size-[18px]" />
                  </a>}
                </div>
                <p className="provider-affiliate-note">Oberoende jämförelsesida · Vi kan få provision via länkar till leverantören.</p>
              </div>
              <div className="provider-visual" aria-hidden="true">
                <div className="provider-visual-aura" />
                <div className="provider-globe">
                  <div className="provider-globe-latitude latitude-one" />
                  <div className="provider-globe-latitude latitude-two" />
                  <div className="provider-globe-latitude latitude-three" />
                  <div className="provider-globe-longitude longitude-one" />
                  <div className="provider-globe-longitude longitude-two" />
                  <div className="provider-globe-highlight" />
                </div>
                <div className="provider-floating-tag provider-floating-tag-one"><Wifi className="size-4" /> eSIM READY</div>
                <div className="provider-floating-tag provider-floating-tag-two"><MapPin className="size-4" /> {isAiralo ? "200+ platser" : "Upptäck världen"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="provider-features container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="provider-feature"><div className="provider-feature-icon"><Globe2 className="size-5" /></div><div><strong>{isAiralo ? "200+ destinationer" : "Resmål världen över"}</strong><span>Utforska lokala och regionala alternativ</span></div></div>
          <div className="provider-feature"><div className="provider-feature-icon"><Smartphone className="size-5" /></div><div><strong>Digitalt eSIM</strong><span>Inget fysiskt SIM-kort att byta</span></div></div>
          <div className="provider-feature"><div className="provider-feature-icon"><ShieldCheck className="size-5" /></div><div><strong>Direkt hos leverantören</strong><span>Priser och villkor visas hos {seller.name}</span></div></div>
        </div>
        {isAiralo && <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="provider-collection-intro">
            <div><p className="provider-overline"><Sparkles className="size-4" /> UPPTÄCK DIN NÄSTA RESA</p><h2>Var vill du vara <em>uppkopplad?</em></h2><p>Välj ett resmål för att se vad Airalo erbjuder. Alla köp genomförs direkt hos leverantören.</p></div>
            <span className="provider-collection-count">01 — 06</span>
          </div>
        </div>}
        {policies.length > 0 && <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">{policies.map(p=><details key={p.id} className="border-b border-slate-200 py-4"><summary className="cursor-pointer font-medium">{p.name}</summary><p className="mt-2 text-sm text-slate-500">{p.body}</p></details>)}</div>}
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
