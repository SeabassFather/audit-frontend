export default function FileUpload({label="Upload", multiple=false, accept, onFiles}){
  return (
    <label className="block">
      <span className="text-sm">{label}</span>
      <input type="file" multiple={multiple} accept={accept}
             onChange={e=>onFiles?.(Array.from(e.target.files||[]))}
             className="mt-1 block w-full border rounded p-2"/>
    </label>
  );
}