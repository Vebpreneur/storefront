export type SiteConfig = {name:string; tagline:string; description:string; accent:string; supplierSlugs:string[]};
export const sites: Record<string,SiteConfig> = {
 default:{name:"eSIM Atlas",tagline:"Hitta rätt eSIM för nästa resa",description:"Jämför leverantörer och utforska resmål på en och samma plats.",accent:"#222222",supplierSlugs:["airalo","yesim","drimsim","saily","cosim","roamic","bytesim","voye-global","quibity"]},
};
export function getSite():SiteConfig { return sites[process.env.NEXT_PUBLIC_SITE_KEY || "default"] ?? sites.default; }
