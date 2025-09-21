import React from 'react'
import { Link } from 'react-router-dom'
export default function ModuleCard({to,title,sub}) {
 return (
 <Link to={to} className='card block hover:shadow-lg transition'>
 <div className='text-auditdna-primary font-semibold'>{title}</div>
 <div className='text-slate-500 text-sm'>{sub}</div>
 </Link>
 )
}