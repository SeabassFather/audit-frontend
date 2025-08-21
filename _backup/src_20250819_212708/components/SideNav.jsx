import React from "react";
import { NavLink } from "react-router-dom";
const Item = ({to,label}) => <NavLink to={to} className={({isActive})=>"navlink"+(isActive?" active":"")}><span></span><span>{label}</span></NavLink>;
export default function SideNav(){
  return (
    <aside className="side">
      <Item to="/" label="Home / Dashboard" />
      <Item to="/lenders" label="Mortgage / Lender Match" />
      <Item to="/ag" label="Food & Agriculture Trade" />
      <Item to="/factoring" label="Factoring & PO Financing" />
      <Item to="/legal" label="Legal & Disclosures" />
      <Item to="/settings" label="Settings" />
    </aside>
  );
}