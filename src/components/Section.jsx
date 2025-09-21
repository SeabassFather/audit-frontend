import React from 'react'
export default function Section({title,children,aside}) {
 return (
 <section className='card'>
 <div className='flex items-center justify-between mb-3'>
 <h2 className='text-lg font-semibold'>{title}</h2>
 {aside}
 </div>
 {children}
 </section>
 )
}