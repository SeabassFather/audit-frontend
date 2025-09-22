export default function Spinner(){
 return (
 <div className="w-full grid place-items-center py-16">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
 <div className="mt-2 text-sm text-slate-600">Loading...</div>
 </div>
 );
}