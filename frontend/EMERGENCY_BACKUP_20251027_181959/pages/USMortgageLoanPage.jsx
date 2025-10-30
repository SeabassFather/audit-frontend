import React, { useState } from "react";
import LoanSearchForm from "../components/LoanSearchForm";
import EscrowFeatureCard from "../components/EscrowFeatureCard";
import TitleSearchEngine from "../components/TitleSearchEngine";
import PropertyProfileCard from "../components/PropertyProfileCard";
import DocumentUploader from "../components/DocumentUploader";
import StatementOfIdentityForm from "../components/StatementOfIdentityForm";
import LicensedLenderCard from "../components/LicensedLenderCard";

export default function USMortgageLoanPage() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [escrowAccount, setEscrowAccount] = useState(null);

  return (
    <div className="main-loan-page">
      {/* Loan Search Criteria Form */}
      <LoanSearchForm onSelectProperty={setSelectedProperty} />

      {/* Escrow & Title Section */}
      <EscrowFeatureCard
        property={selectedProperty}
        onEscrowOpened={setEscrowAccount}
      />
      <TitleSearchEngine onSelectTitleCompany={console.log} />

      {/* Property Profile Section */}
      {selectedProperty && (
        <PropertyProfileCard property={selectedProperty} />
      )}

      {/* Document Upload & Statement of Identity Form (after escrow opens) */}
      {escrowAccount && (
        <>
          <DocumentUploader
            escrowAccount={escrowAccount}
            onUpload={console.log}
          />
          <StatementOfIdentityForm escrowAccount={escrowAccount} />
        </>
      )}

      {/* Licensed Mortgage Professional Card at the bottom */}
      <LicensedLenderCard />
    </div>
  );
}