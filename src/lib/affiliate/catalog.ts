import type { Product, Seller, PaginatedResponse, ProductListParams, ProductFiltersResponse, Category } from "@spree/sdk";
/** Data adapter for the EXISTING Spree frontend. No custom UI components. */
export const affiliateEnabled = () => process.env.NEXT_PUBLIC_AFFILIATE_MODE !== "false";
const photo=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
export const suppliers=[
 ["airalo","Airalo","airalo.com","https://airalo.tpx.lu/JaG8IjYH","photo-1488085061387-422e29b40080"],
 ["yesim","Yesim","yesim.app","https://yesim.tpx.lu/qpivuLfq","photo-1500530855697-b586d89ba3ee"],
 ["drimsim","Drimsim","drimsim.com","https://drimsim.tpx.lu/1QFyOUD1","photo-1469854523086-cc02fe5d8800"],
 ["saily","Saily","saily.com","https://saily.tpx.lu/DhFQGrPS","photo-1533105079780-92b9be482077"],
 ["cosim","Co:sim","cosim.io","https://impact.cosim.io/L0NDvo","photo-1499856871958-5b9627545d1a"],
 ["roamic","Roamic","roamic.com","https://clk.roamic.com/5kNje3","photo-1500534623283-312aade485b7"],
 ["bytesim","ByteSIM","bytesim.com","https://bytesimlimited.pxf.io/L0NDvL","photo-1527631746610-bca00a040d60"],
 ["voye-global","Voye Global","voyeglobal.com","https://voyeglobalconnectivity.pxf.io/k4qRnn","photo-1501785888041-af3ef285b470"],
 ["quibity","Quibity","quibity.com","https://quib.to/d_FIRWQZQS","photo-1470770841072-f978cf4d019e"]
] as const;
export const destinations=[
 ["turkiet","Turkiet","photo-1541432901042-2d8bd64b4a9b"],
 ["usa","USA","photo-1485738422979-f5c462d49f74"],
 ["thailand","Thailand","photo-1528181304800-259b08848526"],
 ["europa","Europa","photo-1477959858617-67f85cf4f1df"],
 ["asien","Asien","photo-1513415277900-a62401e19be4"],
 ["globalt","Globalt","photo-1451187580459-43490279c0fa"]
] as const;
/** Original Spree category navigation, fed from the same static catalog. */
export function localCategories():Category[]{
 return [
  {id:"countries",name:"Länder",permalink:"lander",depth:0,children:[]},
  {id:"regions",name:"Regioner",permalink:"regioner",depth:0,children:[]},
  {id:"global",name:"Globalt",permalink:"globalt",depth:0,children:[]}
 ] as unknown as Category[];
}
export function localCategory(value:string):Category|null{
 return localCategories().find(c=>c.id===value||c.permalink===value)??null;
}
export function affiliateUrl(slug:string):string|undefined{
 const id=slug.startsWith("airalo-")?"airalo":slug;
 return suppliers.find(s=>s[0]===id)?.[3];
}
export function localSellers(): Seller[]{return suppliers.map(([slug,name,domain,,image])=>({
 id:slug,slug,name,about:`Utforska eSIM och uppkoppling hos ${name}.`,
 logo_url:`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
 square_logo_url:`https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
 cover_photo_url:photo(image)
}) as Seller);}
export function localSeller(slug:string){return localSellers().find(s=>s.slug===slug||s.id===slug)??null;}
export function localProducts(): Product[]{return destinations.map(([slug,name,image],i)=>({
 id:`airalo-${slug}`,slug:`airalo-${slug}`,name:`Airalo – ${name}`,
 description:`Utforska eSIM för ${name} hos Airalo.`,
 description_html:`<p>Utforska Airalos eSIM-alternativ för ${name}. Kontrollera aktuella paket, priser och villkor hos leverantören.</p>`,
 thumbnail_url:photo(image),purchasable:false,in_stock:false,
 seller:localSellers()[0],categories:[],
 media:[{id:`image-${i}`,url:photo(image),original_url:photo(image),large_url:photo(image),thumbnail_url:photo(image),variant_ids:[]}],
 variants:[],option_types:[],custom_fields:[]
 }) as unknown as Product);}
export function localProduct(slug:string){return localProducts().find(p=>p.slug===slug||p.id===slug)??null;}
function paginate<T>(data:T[],page=1,limit=24):PaginatedResponse<T>{return {data:data.slice((page-1)*limit,page*limit),meta:{count:data.length,pages:Math.max(1,Math.ceil(data.length/limit)),page,limit}} as unknown as PaginatedResponse<T>;}
export function localSellerList(params:{page?:number;limit?:number;search?:string}={}):PaginatedResponse<Seller>{
 const q=params.search?.toLocaleLowerCase("sv");const list=localSellers().filter(s=>!q||s.name.toLocaleLowerCase("sv").includes(q));return paginate(list,params.page,params.limit);
}
export function localProductList(params:ProductListParams={}):PaginatedResponse<Product>{
 const p=params as Record<string,unknown>;
 let list=localProducts();
 if(p.seller_id_eq && p.seller_id_eq!=="airalo")list=[];
 const selected = Array.isArray(p.with_option_value_ids) ? p.with_option_value_ids.map(String) : [];
 if(selected.length){list=list.filter(d=>selected.some(v=>v==="countries"&&["airalo-turkiet","airalo-usa","airalo-thailand"].includes(d.slug)||v==="regions"&&["airalo-europa","airalo-asien"].includes(d.slug)||v==="global"&&d.slug==="airalo-globalt"));}
 const category=String(p.in_category??"");
 if(category==="countries")list=list.filter(d=>["airalo-turkiet","airalo-usa","airalo-thailand"].includes(d.slug));
 if(category==="regions")list=list.filter(d=>["airalo-europa","airalo-asien"].includes(d.slug));
 if(category==="global")list=list.filter(d=>d.slug==="airalo-globalt");
 const filter=p.q as Record<string,unknown>|undefined;
 const q=String(filter?.name_cont??p.name_cont??p.search??"").trim().toLocaleLowerCase("sv");
 if(q)list=list.filter(d=>d.name.toLocaleLowerCase("sv").includes(q));
 const sort=String(p.sort??filter?.sort??"");
 if(sort.includes("name"))list=[...list].sort((a,b)=>a.name.localeCompare(b.name,"sv")*(sort.startsWith("-")?-1:1));
 return paginate(list,Number(p.page)||1,Number(p.limit)||12);
}
export function localProductFilters():ProductFiltersResponse{return {filters:[{type:"option",id:"destination-type",label:"Typ av destination",kind:"dropdown",options:[{id:"countries",label:"Länder",count:3},{id:"regions",label:"Regioner",count:2},{id:"global",label:"Globalt",count:1}]}],sort_options:[{id:"name",label:"Namn A–Ö",value:"name"},{id:"-name",label:"Namn Ö–A",value:"-name"}],default_sort:"name"} as unknown as ProductFiltersResponse;}
