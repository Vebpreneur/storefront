export type Destination={slug:string;name:string;region:string;image:string;description:string;affiliateUrl?:string};
export type Supplier={id:string;slug:string;name:string;about:string;affiliateUrl:string;domain:string;cover:string;color:string;destinations:Destination[]};
const image=(id:string)=>"https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=1200&q=82";
export const destinations:Destination[]=[
{slug:"turkiet",name:"Turkiet",region:"Land",image:image("photo-1541432901042-2d8bd64b4a9b"),description:"Hitta eSIM-alternativ för din resa till Turkiet."},
{slug:"usa",name:"USA",region:"Land",image:image("photo-1485738422979-f5c462d49f74"),description:"Utforska uppkoppling inför resan till USA."},
{slug:"thailand",name:"Thailand",region:"Land",image:image("photo-1528181304800-259b08848526"),description:"Se tillgängliga eSIM-alternativ för Thailand."},
{slug:"europa",name:"Europa",region:"Region",image:image("photo-1477959858617-67f85cf4f1df"),description:"Utforska regionala eSIM-alternativ för Europa."},
{slug:"asien",name:"Asien",region:"Region",image:image("photo-1513415277900-a62401e19be4"),description:"Upptäck alternativ för resor i Asien."},
{slug:"globalt",name:"Globalt",region:"Globalt",image:image("photo-1451187580459-43490279c0fa"),description:"Utforska internationella eSIM-lösningar."}
];
export const suppliers:Supplier[]=[
{id:"1",slug:"airalo",name:"Airalo",about:"Utforska Airalos eSIM-alternativ för länder, regioner och internationella resor.",affiliateUrl:"https://airalo.tpx.lu/JaG8IjYH",domain:"airalo.com",cover:image("photo-1488085061387-422e29b40080"),color:"#f26f38",destinations},
{id:"2",slug:"yesim",name:"Yesim",about:"Upptäck eSIM-alternativ och internationell uppkoppling hos Yesim.",affiliateUrl:"https://yesim.tpx.lu/qpivuLfq",domain:"yesim.app",cover:image("photo-1500530855697-b586d89ba3ee"),color:"#7351d7",destinations:[]},
{id:"3",slug:"drimsim",name:"Drimsim",about:"Se Drimsims alternativ för mobildata på resan.",affiliateUrl:"https://drimsim.tpx.lu/1QFyOUD1",domain:"drimsim.com",cover:image("photo-1469854523086-cc02fe5d8800"),color:"#2d7891",destinations:[]},
{id:"4",slug:"saily",name:"Saily",about:"Utforska Saily för mobildata under internationella resor.",affiliateUrl:"https://saily.tpx.lu/DhFQGrPS",domain:"saily.com",cover:image("photo-1533105079780-92b9be482077"),color:"#242c4b",destinations:[]},
{id:"5",slug:"cosim",name:"Co:sim",about:"Upptäck Co:sims eSIM-erbjudanden för resenärer.",affiliateUrl:"https://impact.cosim.io/L0NDvo",domain:"cosim.io",cover:image("photo-1499856871958-5b9627545d1a"),color:"#176a66",destinations:[]},
{id:"6",slug:"roamic",name:"Roamic",about:"Utforska internationella eSIM-lösningar från Roamic.",affiliateUrl:"https://clk.roamic.com/5kNje3",domain:"roamic.com",cover:image("photo-1500534623283-312aade485b7"),color:"#e15d58",destinations:[]},
{id:"7",slug:"bytesim",name:"ByteSIM",about:"Upptäck ByteSIMs alternativ för mobildata utomlands.",affiliateUrl:"https://bytesimlimited.pxf.io/L0NDvL",domain:"bytesim.com",cover:image("photo-1527631746610-bca00a040d60"),color:"#328ac9",destinations:[]},
{id:"8",slug:"voye-global",name:"Voye Global",about:"Utforska internationella eSIM-alternativ från Voye Global.",affiliateUrl:"https://voyeglobalconnectivity.pxf.io/k4qRnn",domain:"voyeglobal.com",cover:image("photo-1501785888041-af3ef285b470"),color:"#6a5baa",destinations:[]},
{id:"9",slug:"quibity",name:"Quibity",about:"Se Quibitys alternativ för uppkoppling under resan.",affiliateUrl:"https://quib.to/d_FIRWQZQS",domain:"quibity.com",cover:image("photo-1470770841072-f978cf4d019e"),color:"#279b91",destinations:[]}
];
export function supplierBySlug(slug:string){return suppliers.find(s=>s.slug===slug);}
export function affiliateLink(supplier:Supplier, destination?:Destination){return destination?.affiliateUrl || supplier.affiliateUrl;}
