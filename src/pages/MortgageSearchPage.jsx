import LoanMatchForm from "../forms/LoanMatchForm";
import RateTicker from "../components/RateTicker";
export default function MortgageSearchPage(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mortgage Loan Search</h1>
      <div className="mb-3"><RateTicker/></div>
      <LoanMatchForm/>
    </div>
  );
}