import React from "react";
import Page from "../ui/Page";
import Card from "../ui/Card";
import TradeFinanceForm from "../features/trade/TradeFinanceForm";

export default function TradeFinanceSearchPage(){
  return (
    <Page title="Trade Finance" subtitle="Invoice factoring & PO finance. No mock data; UI will show real errors.">
      <Card><TradeFinanceForm /></Card>
    </Page>
  );
}