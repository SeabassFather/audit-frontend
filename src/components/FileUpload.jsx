export default function FileUpload({label="Upload", onFiles=()=>{}}){
  return (
    <label className="inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer bg-white shadow-sm">
      <span className="text-sm">{label}</span>
      <input type="file" className="hidden" multiple onChange={e=>onFiles([...e.target.files])}/>
    </label>
  );
}