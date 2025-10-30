import React, { useState } from 'react';
import PropertySearch from './PropertySearch.jsx';
import PropertyUploadForm from './PropertyUploadForm.jsx';
// import OwnerContactCard from '../components/OwnerContactCard.jsx'; // REMOVED because the file was deleted!
import OwnerBuyerForm from '../components/OwnerBuyerForm.jsx';
import MexicoRefiCard from '../components/MexicoRefiCard.jsx';
import ReferralPartnerCard from '../components/ReferralPartnerCard.jsx';
import AgentRegistrationCard from '../components/AgentRegistrationCard.jsx';
import AppraisalServicesCard from '../components/AppraisalServicesCard.jsx';
import LegalQuestionnaireCard from '../components/LegalQuestionnaireCard.jsx';

// Accordion logic
function Accordion({ children, defaultOpen = -1 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, {
      open: openIndex === i,
      onHeaderClick: () => setOpenIndex(openIndex === i ? -1 : i),
    })
  );
}
function AccordionItem({ title, open, onHeaderClick, children, color }) {
  return (
    <div className="border rounded-xl shadow-xl mb-6 overflow-hidden bg-white">
      <button
        type="button"
        onClick={onHeaderClick}
        className={`w-full flex items-center justify-between px-6 py-4 font-bold text-lg transition-colors ${
          open ? `${color} text-gray-900` : 'bg-gray-50 text-gray-800'
        }`}
        style={{ cursor: 'pointer' }}
      >
        <span>{title}</span>
        <span
          className={`transition-transform ${open ? 'rotate-90' : ''}`}
          style={{ fontSize: 24, lineHeight: 1 }}
        >
<<<<<<< HEAD
          {'›'}
=======
          {'Ã¢â‚¬Âº'}
>>>>>>> my/push-branch
        </span>
      </button>
      <div className={`transition-all duration-300 ${open ? 'block' : 'hidden'}`}>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function MortgageTabRealEstate() {
  const [view, setView] = useState('search');
  const [language, setLanguage] = useState('english');

  const colors = {
    yellow: 'bg-gradient-to-r from-yellow-50 to-green-100',
    green: 'bg-gradient-to-r from-green-100 to-yellow-50',
    button: 'bg-gradient-to-r from-green-400 to-yellow-200 text-gray-900 hover:from-green-300 hover:to-yellow-100',
    header: 'bg-gradient-to-r from-yellow-100 via-green-100 to-white',
  };

  const labels = {
    english: {
      search: 'Search Properties',
      list: '+ List Property',
      header: 'Mexico Real Estate',
<<<<<<< HEAD
      sub: 'Bienes Raíces en México • Full Service Platform',
=======
      sub: 'Bienes RaÃƒÂ­ces en MÃƒÂ©xico Ã¢â‚¬Â¢ Full Service Platform',
>>>>>>> my/push-branch
      agent: 'Agent Registration',
      refi: 'Mexico Home Refinance / Buy in Mexico (US Citizens Only)',
      partner: 'Referral Partner Registration',
      appraisal: 'Appraisal Services',
      legal: 'Legal/Fideicomiso Questionnaire',
      contact: 'Contact Info',
<<<<<<< HEAD
      toggle: 'Español',
=======
      toggle: 'EspaÃƒÂ±ol',
>>>>>>> my/push-branch
      upload: 'List Your Property',
      contactOwner: 'Contact Property Owner',
      buyerForm: 'Buyer Inquiry / Express Interest',
      propertySearch: 'Search for Properties'
    },
    spanish: {
      search: 'Buscar Propiedades',
      list: '+ Publicar Propiedad',
<<<<<<< HEAD
      header: 'Bienes Raíces México',
      sub: 'Mexico Real Estate • Plataforma de Servicio Completo',
      agent: 'Registro de Agente',
      refi: 'Refinanciamiento / Compra en México (Solo Ciudadanos USA)',
      partner: 'Registro de Socio de Referencia',
      appraisal: 'Servicios de Avalúo',
      legal: 'Cuestionario Legal/Fideicomiso',
      contact: 'Información de Contacto',
      toggle: 'English',
      upload: 'Publicar Propiedad',
      contactOwner: 'Contactar al Propietario',
      buyerForm: 'Solicitud de Información / Interés de Compra',
=======
      header: 'Bienes RaÃƒÂ­ces MÃƒÂ©xico',
      sub: 'Mexico Real Estate Ã¢â‚¬Â¢ Plataforma de Servicio Completo',
      agent: 'Registro de Agente',
      refi: 'Refinanciamiento / Compra en MÃƒÂ©xico (Solo Ciudadanos USA)',
      partner: 'Registro de Socio de Referencia',
      appraisal: 'Servicios de AvalÃƒÂºo',
      legal: 'Cuestionario Legal/Fideicomiso',
      contact: 'InformaciÃƒÂ³n de Contacto',
      toggle: 'English',
      upload: 'Publicar Propiedad',
      contactOwner: 'Contactar al Propietario',
      buyerForm: 'Solicitud de InformaciÃƒÂ³n / InterÃƒÂ©s de Compra',
>>>>>>> my/push-branch
      propertySearch: 'Buscar Propiedades'
    }
  };

  const t = labels[language];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${colors.header} rounded-lg shadow-2xl p-8`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M16 3v4M8 3v4" />
            </svg>
            <div>
              <h1 className="text-4xl font-bold text-green-800">{t.header}</h1>
              <p className="text-xl text-yellow-700">{t.sub}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setView('search')}
              className={`px-6 py-3 rounded-lg font-bold transition-all border ${view === 'search' ? colors.button + ' border-green-400' : 'bg-gray-100 border-gray-300 text-green-700'}`}
            >
              {t.search}
            </button>
            <button
              onClick={() => setView('addListing')}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 border ${view === 'addListing' ? colors.button + ' border-green-400' : 'bg-gray-100 border-gray-300 text-green-700'}`}
            >
              {t.list}
            </button>
            <button
              onClick={() => setLanguage(language === 'english' ? 'spanish' : 'english')}
              className="ml-4 px-4 py-2 rounded-lg border bg-white border-yellow-300 text-yellow-700 font-bold shadow"
              aria-label="Toggle language"
            >
              {t.toggle}
            </button>
          </div>
        </div>
      </div>

      {/* Main Views */}
      {view === 'search' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <Accordion defaultOpen={-1}>
              <AccordionItem title={t.propertySearch} color={colors.yellow}>
                <PropertySearch language={language} />
              </AccordionItem>
              {/* REMOVED Contact Property Owner Section */}
              <AccordionItem title={t.buyerForm} color={colors.yellow}>
                <OwnerBuyerForm language={language} />
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            {/* Optionally put additional accordions here for search view */}
          </div>
        </div>
      )}

      {view === 'addListing' && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div>
            <Accordion defaultOpen={-1}>
              <AccordionItem title={t.upload} color={colors.yellow}>
                <PropertyUploadForm language={language} />
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <Accordion defaultOpen={-1}>
              <AccordionItem title={t.refi} color={colors.yellow}>
                <MexicoRefiCard language={language} />
              </AccordionItem>
              <AccordionItem title={t.partner} color={colors.green}>
                <ReferralPartnerCard language={language} />
              </AccordionItem>
              <AccordionItem title={t.agent} color={colors.yellow}>
                <AgentRegistrationCard language={language} />
              </AccordionItem>
              <AccordionItem title={t.appraisal} color={colors.green}>
                <AppraisalServicesCard language={language} />
              </AccordionItem>
              <AccordionItem title={t.legal} color={colors.yellow}>
                <LegalQuestionnaireCard language={language} />
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gradient-to-br from-yellow-50 to-green-100 rounded-lg shadow-lg p-8 border-2 border-green-200">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-green-900">{t.contact}</h3>
          <p className="text-lg font-semibold text-green-800">Saul Garcia</p>
          <p className="text-lg font-bold text-green-700">NMLS #337526</p>
          <p className="text-md text-yellow-700">Everwise Home Loans & Realty</p>
          <p className="text-sm text-gray-600">Company NMLS #1739012 | DRE #02067255</p>
          <p className="text-sm text-gray-600">15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
          <p className="text-sm text-gray-600">Phone: 1-844-853-9300</p>
        </div>
      </div>
    </div>
  );
}