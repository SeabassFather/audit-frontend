import RateTicker from "../components/RateTicker";
import StockTicker from "../components/StockTicker";
export default function Tickers(){
 return (
 <div className="flex flex-wrap gap-3">
 <RateTicker/>
 <StockTicker/>
 </div>
 );
}