import React from "react";

export default function Agreements() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Agreements &amp; Forms</h1>
      
      {/* Financial Audit Authorization */}
      <section className="bg-white rounded-xl shadow-md border border-gray-100 mb-8 p-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-5 bg-blue-500 rounded-sm mr-2"></span>
          Financial Audit Authorization Form
        </h2>
        <p className="text-gray-600 mb-4">
          Please complete this authorization or download a blank copy.
        </p>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-800">Authorization:</label>
            <div className="flex flex-col md:flex-row md:gap-10">
              <div className="space-y-2 flex-1">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  I consent to OCR and AI analysis.
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  I authorize regulatory transmission (CFPB, State).
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-blue-600" />
                  I understand QR verification will be attached.
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Date</label>
              <input type="date" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-gray-700">Signature</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Type full name" />
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <a href="/download/authorization.txt" className="text-blue-600 hover:underline text-sm font-medium">Download blank form</a>
            <button type="submit" className="ml-auto px-5 py-2 bg-blue-700 text-white rounded-md shadow hover:bg-blue-800 transition">Submit</button>
          </div>
        </form>
      </section>

      {/* Partner Onboarding & Eligibility */}
      <section className="bg-white rounded-xl shadow-md border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-5 bg-green-500 rounded-sm mr-2"></span>
          Partner Onboarding &amp; Eligibility Form
        </h2>
        <p className="text-gray-600 mb-4">
          For professional partners and onboarding.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-gray-800 mb-2">Eligible Roles:</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> NMLS-licensed professional
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> CPA
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> Attorney
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> Escrow Officer
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-700">Company</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-700">License Type</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-700">License #</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-gray-700">Phone</label>
              <input type="text" className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> I affirm eligibility
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-600" /> I agree to policies
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <label className="block text-gray-700">Signature</label>
              <input type="text" className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ml-2" placeholder="Type full name" />
              <label className="block text-gray-700 ml-3">Date</label>
              <input type="date" className="border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 ml-2" />
            </div>
          </div>
          <div className="flex items-center gap-4 pt-2">
            <a href="/download/partner-eligibility.txt" className="text-green-600 hover:underline text-sm font-medium">Download blank form</a>
            <button type="submit" className="ml-auto px-5 py-2 bg-green-700 text-white rounded-md shadow hover:bg-green-800 transition">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
}