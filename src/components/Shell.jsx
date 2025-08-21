import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
export default function Shell({children}){
  return(<div className='shell'>
    <Sidebar/>
    <div className='main'>
      <Topbar/>
      <div className='content'>{children}</div>
    </div>
  </div>);
}