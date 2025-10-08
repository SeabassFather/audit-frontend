import React,{useState} from 'react';
import FileUpload from '../components/FileUpload';

export default function Uploads(){
  const [docs,setDocs]=useState([]);
  return(
    <div className='container'>
      <h1>Document Uploads</h1>
      <FileUpload onUpload={f=>setDocs(docs.concat(f))}/>
      <ul>
        {docs.map((d,i)=><li key={i}>{d.name}   Pending Review</li>)}
      </ul>
    </div>
  );
}



