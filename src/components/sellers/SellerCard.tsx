import type { Seller } from "@spree/sdk";
import { ArrowUpRight, Globe2, Wifi } from "lucide-react";
import { affiliateEnabled } from "@/lib/affiliate/catalog";
import Link from "next/link";
import { SellerImage } from "@/components/ui/seller-image";

interface SellerCardProps {
  seller: Seller;
  basePath: string;
  logoAlt: string;
  visitShopLabel: string;
}

export function SellerCard({
  seller,
  basePath,
  logoAlt,
  visitShopLabel,
}: SellerCardProps): React.JSX.Element {
  const logo = seller.square_logo_url || seller.logo_url;


  if (affiliateEnabled()) {
    return (
      <Link href={`${basePath}/sellers/${seller.slug}`}
        data-provider={seller.slug}
        className="provider-directory-card group relative flex flex-col overflow-hidden border border-[#e8e7ed] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ac7796]">
        <div className="provider-directory-cover">
          <div className="provider-directory-pattern" aria-hidden="true" />
          <div className="provider-directory-circle" aria-hidden="true" />
          <div className="provider-directory-cover-heading"><Globe2 className="size-4" /> eSIM / TRAVEL</div>
          <span className="provider-directory-cover-name">{seller.name}</span>
        </div>
        <div className="flex flex-1 flex-col px-6 pb-6">
          <div className="provider-directory-logo">
            <SellerImage src={logo} alt={logoAlt} fill sizes="70px" className="object-contain p-3" iconClassName="size-6" />
          </div>
          <p className="mt-4 text-[10px] font-extrabold tracking-[.16em] text-[#a08099] uppercase">VERIFIERA ERBJUDANDEN HOS LEVERANTÖREN</p>
          <h2 className="mt-2 font-[800] text-[23px] tracking-[-.05em] text-[#262230]" style={{fontFamily:"var(--font-display)"}}>{seller.name}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#86818e]">{seller.about || `Utforska reseuppkoppling hos ${seller.name}.`}</p>
          <div className="mt-auto flex items-center justify-between border-t border-[#efedf1] pt-5">
            <span className="text-xs font-bold text-[#56505f]">{visitShopLabel}</span>
            <span className="provider-directory-arrow"><ArrowUpRight className="size-5" /></span>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`${basePath}/sellers/${seller.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
    >
      <div className="relative aspect-[3/1] bg-gray-100">
        {seller.cover_photo_url && (
          <SellerImage
            src={seller.cover_photo_url}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="relative -mt-8 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm">
          <SellerImage
            src={logo}
            alt={logoAlt}
            fill
            sizes="64px"
            className="object-cover"
            iconClassName="w-6 h-6"
          />
        </div>

        <h2 className="mt-3 text-lg font-semibold text-gray-900 group-hover:underline">
          {seller.name}
        </h2>
        {seller.about && (
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {seller.about}
          </p>
        )}
        <span className="mt-auto pt-4 text-sm font-medium text-gray-900">
          {visitShopLabel} &rarr;
        </span>
      </div>
    </Link>
  );
}
