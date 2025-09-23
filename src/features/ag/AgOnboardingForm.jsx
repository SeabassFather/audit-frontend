import React, { useMemo, useState } from "react";
import { searchAgMarket } from "../../utils/agMarketplaceAPI";
import RiskBadge from "../../components/RiskBadge";
import CertBadge from "../../components/CertBadge";
import FileUpload from "../../components/FileUpload";

export default function AgOnboardingForm() {
  const [biz, setBiz] = useState({
    legalName: "",
    dba: "",
    country: "US",
    ein: "",
    duns: "",
    years: "",
  });
  const [kyb, setKyb] = useState({
    owners: "",
    contact: "",
    email: "",
    phone: "",
  });
  const [fac, setFac] = useState({
    locations: "",
    laWarehouse: false,
    coldChain: false,
    recallPlan: false,
  });
  const [cert, setCert] = useState({
    primus: false,
    globalgap: false,
    usdaReg: false,
    fdaFfr: false,
    organic: false,
  });
  const [prod, setProd] = useState({
    crop: "",
    variety: "",
    grade: "",
    pack: "",
    size: "",
    hs: "",
    harvest: "",
    volume: "",
    targetPrice: "",
    incoterms: "FOB",
    ship: "",
  });
  const [buyer, setBuyer] = useState({ name: "", type: "", po: "", terms: "" });
  const [ins, setIns] = useState({ productLiab: false, cargo: false });
  const [docs, setDocs] = useState({
    haccp: false,
    lab: false,
    mrl: false,
    phyto: false,
    bol: false,
  });
  const [uploads, setUploads] = useState([]);
  const [out, setOut] = useState(null);
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  const risk = useMemo(() => {
    let s = 50;
    if (cert.primus) s += 10;
    if (cert.globalgap) s += 10;
    if (cert.organic) s += 5;
    if (!ins.productLiab) s -= 10;
    if (buyer.type?.toLowerCase().includes("retail")) s += 5;
    if (fac.coldChain) s += 5;
    return Math.max(0, Math.min(100, s));
  }, [cert, ins, buyer, fac]);

  const change = (setter) => (e) => {
    const { name, type, checked, value } = e.target;
    setter((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    setOut(null);
    try {
      const payload = {
        company: biz,
        kyb,
        facility: fac,
        certs: cert,
        product: prod,
        buyer,
        insurance: ins,
        compliance: docs,
        attachments: uploads.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
        })),
      };
      const data = await searchAgMarket(payload);
      setOut(data);
    } catch (ex) {
      setErr(ex?.response?.data || ex.message);
    } finally {
      setBusy(false);
    }
  };

  const i = {
    padding: "10px 12px",
    background: "#111",
    color: "#eee",
    border: "1px solid #333",
    borderRadius: 8,
  };
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
  const line = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
  };

  return (
    <form
      onSubmit={submit}
      style={{ maxWidth: 1000, margin: "24px auto", padding: "0 12px" }}
    >
      <h1>Ag Marketplace Search / Onboarding</h1>
      <p style={{ opacity: 0.7, fontSize: 12, margin: "4px 0 16px" }}>
        POST /api/search/ag-market includes compliance + risk model
      </p>

      <div style={{ marginBottom: 8 }}>
        Risk: <RiskBadge score={risk} /> &nbsp;
        <CertBadge name="PrimusGFS" ok={cert.primus} />
        <CertBadge name="GlobalG.A.P." ok={cert.globalgap} />
        <CertBadge name="USDA Reg" ok={cert.usdaReg} />
        <CertBadge name="FDA FFR" ok={cert.fdaFfr} />
        <CertBadge name="USDA Organic" ok={cert.organic} />
      </div>

      <section style={grid2}>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Company</div>
          <input
            name="legalName"
            placeholder="Legal name"
            value={biz.legalName}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="dba"
            placeholder="DBA"
            value={biz.dba}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="country"
            placeholder="Country"
            value={biz.country}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="ein"
            placeholder="EIN/RFC"
            value={biz.ein}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="duns"
            placeholder="DUNS"
            value={biz.duns}
            onChange={change(setBiz)}
            style={i}
          />
          <input
            name="years"
            placeholder="Years in business"
            value={biz.years}
            onChange={change(setBiz)}
            style={i}
          />
          <div style={line}>
            <label>
              <input
                type="checkbox"
                name="laWarehouse"
                checked={fac.laWarehouse}
                onChange={change(setFac)}
              />{" "}
              LA Warehouse partner
            </label>
            <label>
              <input
                type="checkbox"
                name="coldChain"
                checked={fac.coldChain}
                onChange={change(setFac)}
              />{" "}
              Cold chain
            </label>
            <label>
              <input
                type="checkbox"
                name="recallPlan"
                checked={fac.recallPlan}
                onChange={change(setFac)}
              />{" "}
              Recall plan
            </label>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Certifications</div>
          <label>
            <input
              type="checkbox"
              name="primus"
              checked={cert.primus}
              onChange={change(setCert)}
            />{" "}
            PrimusGFS
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="globalgap"
              checked={cert.globalgap}
              onChange={change(setCert)}
            />{" "}
            GlobalG.A.P.
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="usdaReg"
              checked={cert.usdaReg}
              onChange={change(setCert)}
            />{" "}
            USDA facility registration
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="fdaFfr"
              checked={cert.fdaFfr}
              onChange={change(setCert)}
            />{" "}
            FDA FFR
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="organic"
              checked={cert.organic}
              onChange={change(setCert)}
            />{" "}
            USDA Organic
          </label>
          <FileUpload
            label="Upload certs & docs (PDF/IMG)"
            onFiles={setUploads}
          />
        </div>
      </section>

      <section style={{ ...grid2, marginTop: 12 }}>
        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>Product</div>
          <input
            name="crop"
            placeholder="Crop"
            value={prod.crop}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="variety"
            placeholder="Variety"
            value={prod.variety}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="grade"
            placeholder="Grade/spec"
            value={prod.grade}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="pack"
            placeholder="Pack style"
            value={prod.pack}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="size"
            placeholder="Size"
            value={prod.size}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="hs"
            placeholder="HS code"
            value={prod.hs}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="harvest"
            placeholder="Harvest window"
            value={prod.harvest}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="volume"
            placeholder="Volume (wk/mo)"
            value={prod.volume}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="targetPrice"
            placeholder="Target price"
            value={prod.targetPrice}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="incoterms"
            placeholder="Incoterms (FOB/CIF)"
            value={prod.incoterms}
            onChange={change(setProd)}
            style={i}
          />
          <input
            name="ship"
            placeholder="Ship terms"
            value={prod.ship}
            onChange={change(setProd)}
            style={i}
          />
        </div>

        <div>
          <div style={{ fontWeight: 700, margin: "8px 0" }}>
            Buyer & Insurance
          </div>
          <input
            name="name"
            placeholder="Buyer name (optional)"
            value={buyer.name}
            onChange={change(setBuyer)}
            style={i}
          />
          <input
            name="type"
            placeholder="Type (retail/wholesale/chain)"
            value={buyer.type}
            onChange={change(setBuyer)}
            style={i}
          />
          <input
            name="po"
            placeholder="PO #"
            value={buyer.po}
            onChange={change(setBuyer)}
            style={i}
          />
          <input
            name="terms"
            placeholder="Payment terms (Net 30/45/60/90)"
            value={buyer.terms}
            onChange={change(setBuyer)}
            style={i}
          />
          <div style={line}>
            <label>
              <input
                type="checkbox"
                name="productLiab"
                checked={ins.productLiab}
                onChange={change(setIns)}
              />{" "}
              Product liability COI
            </label>
            <label>
              <input
                type="checkbox"
                name="cargo"
                checked={ins.cargo}
                onChange={change(setIns)}
              />{" "}
              Cargo insurance
            </label>
          </div>
          <div style={{ fontWeight: 700, margin: "12px 0 6px" }}>
            Compliance docs
          </div>
          <div style={line}>
            <label>
              <input
                type="checkbox"
                name="haccp"
                checked={docs.haccp}
                onChange={change(setDocs)}
              />{" "}
              HACCP/FSMA
            </label>
            <label>
              <input
                type="checkbox"
                name="lab"
                checked={docs.lab}
                onChange={change(setDocs)}
              />{" "}
              Lab tests
            </label>
            <label>
              <input
                type="checkbox"
                name="mrl"
                checked={docs.mrl}
                onChange={change(setDocs)}
              />{" "}
              MRL
            </label>
            <label>
              <input
                type="checkbox"
                name="phyto"
                checked={docs.phyto}
                onChange={change(setDocs)}
              />{" "}
              Phytosanitary
            </label>
            <label>
              <input
                type="checkbox"
                name="bol"
                checked={docs.bol}
                onChange={change(setDocs)}
              />{" "}
              Prior BOLs
            </label>
          </div>
        </div>
      </section>

      <button
        disabled={busy}
        style={{
          marginTop: 18,
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #2a2a2a",
          background: "#1a1a1a",
          color: "#eee",
        }}
      >
        {busy ? "Submitting" : "Search / Score / Connect"}
      </button>

      <p style={{ marginTop: 10, fontSize: 12, opacity: 0.8 }}>
        Export-ready only: PrimusGFS & GlobalG.A.P. required for direct export.
        If not certified, we can still facilitate Factoring/PO Finance via our
        USA partner and coordinate logistics via our LA warehouse &
        distribution.
      </p>

      {err ? (
        <div style={{ color: "#f66", marginTop: 12 }}>{String(err)}</div>
      ) : null}
      {out ? (
        <pre
          style={{
            marginTop: 12,
            fontSize: 12,
            background: "#111",
            border: "1px solid #333",
            borderRadius: 8,
            padding: 12,
          }}
        >
          {JSON.stringify(out, null, 2)}
        </pre>
      ) : null}
    </form>
  );
}
