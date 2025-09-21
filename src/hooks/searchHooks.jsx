import { useState } from "react";
import { mortgageSearchAPI, agMarketplaceAPI, tradeFinanceAPI } from "../utils/searchAPIs";

export function useMortgageSearch(){
 const [values,set] = useState({ borrowerName:"", email:"", phone:"", consent:true,
 address:"", propertyType:"Single Family", occupancy:"Primary",
 purpose:"Purchase", price:"", estValue:"", loanAmount:"", product:"Conventional",
 creditRange:"680-719", dti:"", ltv:"", income:"", assets:"", timing:"30 days", lock:"Float"
 });
 const [loading,setLoading]=useState(false), [results,setResults]=useState([]);
 const setValue=(k,v)=>set(s=>({...s,[k]:v}));
 async function submit(){ setLoading(true); setResults(await mortgageSearchAPI(values)); setLoading(false); }
 return {values,setValue,submit,loading,results};
}

export function useAgMarketplaceSearch(){
 const [values,set] = useState({ legalName:"", duns:"", country:"MX",
 locations:"", laWarehouse:false, crop:"", variety:"", grade:"", pack:"", volume:"", price:"",
 primus:false, globalgap:false, usdaReg:false, fdaFFR:false
 });
 const [loading,setLoading]=useState(false), [results,setResults]=useState([]);
 const setValue=(k,v)=>set(s=>({...s,[k]:v}));
 async function submit(){ setLoading(true); setResults(await agMarketplaceAPI(values)); setLoading(false); }
 return {values,setValue,submit,loading,results};
}

export function useTradeFinanceSearch(){
 const [values,set] = useState({ legalName:"", duns:"", revenue:"", arAging:"",
 facility:"Factoring", amount:"", currency:"USD", debtor:"", terms:"Net 45",
 collateral:"", commitment:"60 days", regions:["MX"]
 });
 const [loading,setLoading]=useState(false), [results,setResults]=useState([]);
 const setValue=(k,v)=>set(s=>({...s,[k]:v}));
 async function submit(){ setLoading(true); setResults(await tradeFinanceAPI(values)); setLoading(false); }
 return {values,setValue,submit,loading,results};
}
