import Link from "next/link";
import type {Supplier} from "../data/suppliers";
export function SellerCard({seller}:{seller:Supplier}){
return <Link href={"/sellers/"+seller.slug} className="seller-card">
<div className="seller-cover" style={{backgroundImage:`url("${seller.cover}")`}}/>
<div className="seller-card-content"><div className="seller-logo" style={{backgroundColor:seller.color}}><img src={`https://www.google.com/s2/favicons?domain=${seller.domain}&sz=128`} alt="" /><span className="sr-only">{seller.name}</span></div><h3>{seller.name}</h3><p>{seller.about}</p><span className="card-action">Visa leverantör <span aria-hidden>↗</span></span></div>
</Link>}
