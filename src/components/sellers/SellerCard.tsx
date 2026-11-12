import type { Seller } from "@spree/sdk";
import { ArrowUpRight } from "lucide-react";
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
      <Link href={`${basePath}/sellers/${seller.slug}`} className="provider-directory-card group">
        <div className="provider-directory-cover">
          {seller.cover_photo_url && <SellerImage src={seller.cover_photo_url} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />}
        </div>
        <div className="provider-directory-content">
          <div className="provider-directory-logo"><SellerImage src={logo} alt={logoAlt} fill sizes="64px" className="object-contain p-2" /></div>
          <span className="provider-directory-type">eSIM-leverantör</span>
          <h2>{seller.name}</h2>
          <p>{seller.about || `Utforska reseuppkoppling hos ${seller.name}.`}</p>
          <span className="provider-directory-link">{visitShopLabel} <ArrowUpRight className="size-[18px]" /></span>
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
