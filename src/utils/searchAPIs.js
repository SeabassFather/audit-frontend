export async function mortgageSearchAPI(payload){
 // TODO: POST to /api/search/mortgages in your backend
 return new Promise(r=>setTimeout(()=>r([
 { lender:"Lender A", rate:"6.25%", fit:"Strong", product:payload.product, reasons:["State license","DTI ok"] },
 { lender:"Lender B", rate:"6.45%", fit:"Medium", product:payload.product, reasons:["Jumbo min size ok"] }
 ]), 500));
}
export async function agMarketplaceAPI(payload){
 // TODO: POST to /api/search/ag-market
 return new Promise(r=>setTimeout(()=>r([
 { grower:"Rancho Verde", crop:payload.crop||"Avocados", certs:["PrimusGFS","GlobalG.A.P."], risk:"Low", weekly:payload.volume||"20 MT" },
 { grower:"Campo Sol", crop:payload.crop||"Strawberries", certs:["GlobalG.A.P."], risk:"Medium", weekly:"15 MT" }
 ]), 500));
}
export async function tradeFinanceAPI(payload){
 // TODO: POST to /api/search/trade-finance
 return new Promise(r=>setTimeout(()=>r([
 { product:payload.facility||"Factoring", advance:"80%", tenor:payload.commitment||"60 days", note:"Buyer AA proxy" },
 { product:"PO Financing", advance:"70%", tenor:"90 days", note:"Docs complete" }
 ]), 500));
}