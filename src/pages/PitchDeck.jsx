import { useState } from "react";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "AuditDNA Platform",
      subtitle: "Modern Audit & Compliance Solutions",
      content: (
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">AD</span>
          </div>
          <p className="text-xl text-slate-600 mb-8">
            Comprehensive auditing platform serving Agriculture, Mortgage, Medical, Legal, and Business sectors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">275+</div>
              <div className="text-sm text-slate-600">Services</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">50K+</div>
              <div className="text-sm text-slate-600">Documents</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-slate-600">Uptime</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">24/7</div>
              <div className="text-sm text-slate-600">Support</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Problem",
      subtitle: "Fragmented Audit Landscape",
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Current Challenges</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Multiple disconnected audit platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Manual document processing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Lack of CFPB-aware compliance tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">❌</span>
                  <span>Outdated pricing information</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Market Impact</h3>
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">$2.3B</div>
                  <div className="text-sm">Annual compliance costs</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">40%</div>
                  <div className="text-sm">Time lost to manual processes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Our Solution",
      subtitle: "Unified Audit Platform",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">275+ Services</h3>
              <p className="text-sm text-slate-600">Complete audit coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-slate-600">ChatGPT integration</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="font-semibold mb-2">CFPB-Aware</h3>
              <p className="text-sm text-slate-600">Built-in compliance</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li>✅ OCR document processing</li>
                <li>✅ Real-time USDA pricing</li>
                <li>✅ Automated compliance checks</li>
              </ul>
              <ul className="space-y-2">
                <li>✅ Professional reporting</li>
                <li>✅ Secure file handling</li>
                <li>✅ API integrations</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Market Opportunity",
      subtitle: "Growing Compliance Market",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Market Size</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">$32B</div>
                  <div className="text-sm">GRC Software Market (2024)</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">13.9%</div>
                  <div className="text-sm">Annual Growth Rate</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Target Markets</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Agriculture</span>
                  <span className="font-semibold">$2.1B</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Financial Services</span>
                  <span className="font-semibold">$12.8B</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <span>Healthcare</span>
                  <span className="font-semibold">$8.3B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Business Model",
      subtitle: "Subscription & Usage-Based Revenue",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <h3 className="font-semibold mb-4 text-blue-600">Basic</h3>
              <div className="text-3xl font-bold mb-2">$99</div>
              <div className="text-sm text-slate-600 mb-4">per month</div>
              <ul className="text-sm space-y-2">
                <li>• 50 audits/month</li>
                <li>• Basic reporting</li>
                <li>• Email support</li>
              </ul>
            </div>
            <div className="card text-center border-blue-500 border-2">
              <h3 className="font-semibold mb-4 text-blue-600">Professional</h3>
              <div className="text-3xl font-bold mb-2">$299</div>
              <div className="text-sm text-slate-600 mb-4">per month</div>
              <ul className="text-sm space-y-2">
                <li>• 200 audits/month</li>
                <li>• Advanced reporting</li>
                <li>• AI assistance</li>
                <li>• Priority support</li>
              </ul>
            </div>
            <div className="card text-center">
              <h3 className="font-semibold mb-4 text-blue-600">Enterprise</h3>
              <div className="text-3xl font-bold mb-2">Custom</div>
              <div className="text-sm text-slate-600 mb-4">contact sales</div>
              <ul className="text-sm space-y-2">
                <li>• Unlimited audits</li>
                <li>• Custom integrations</li>
                <li>• Dedicated support</li>
                <li>• White labeling</li>
              </ul>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Revenue Projections</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">$1.2M</div>
                <div className="text-sm">Year 1</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$5.8M</div>
                <div className="text-sm">Year 2</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$18.5M</div>
                <div className="text-sm">Year 3</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Competitive Advantage",
      subtitle: "What Sets Us Apart",
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Our Advantages</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✅</span>
                  <div>
                    <div className="font-medium">CFPB-Aware Design</div>
                    <div className="text-sm text-slate-600">Built-in regulatory compliance</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✅</span>
                  <div>
                    <div className="font-medium">275+ Pre-built Services</div>
                    <div className="text-sm text-slate-600">Comprehensive coverage</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✅</span>
                  <div>
                    <div className="font-medium">AI Integration</div>
                    <div className="text-sm text-slate-600">ChatGPT-powered analysis</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✅</span>
                  <div>
                    <div className="font-medium">Real-time USDA Data</div>
                    <div className="text-sm text-slate-600">Live commodity pricing</div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Competitors</h3>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="font-medium">Traditional GRC Tools</div>
                  <div className="text-sm text-slate-600">❌ Generic, not audit-specific</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="font-medium">Legacy Audit Software</div>
                  <div className="text-sm text-slate-600">❌ Outdated, poor UX</div>
                </div>
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="font-medium">Manual Processes</div>
                  <div className="text-sm text-slate-600">❌ Time-consuming, error-prone</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Next Steps",
      subtitle: "Join the Future of Auditing",
      content: (
        <div className="text-center space-y-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-slate-600 mb-8">
              Ready to transform your audit and compliance processes? 
              AuditDNA is here to streamline your operations with modern technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Get Started</h3>
              <p className="text-sm text-slate-600">Browse our services and begin your audit journey</p>
              <a href="/services" className="btn-primary mt-4">
                Explore Services
              </a>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">Try AI Assistant</h3>
              <p className="text-sm text-slate-600">Experience our ChatGPT-powered audit helper</p>
              <a href="/chat" className="btn-secondary mt-4">
                Start Chat
              </a>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-semibold mb-2">Contact Sales</h3>
              <p className="text-sm text-slate-600">Speak with our team about enterprise solutions</p>
              <a href="/admin" className="btn-outline mt-4">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Slide Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">AuditDNA Pitch Deck</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">
            {currentSlide + 1} of {slides.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="btn-outline"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="btn-primary"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Current Slide */}
      <div className="card min-h-[600px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl text-slate-600">
            {slides[currentSlide].subtitle}
          </p>
        </div>
        
        <div className="flex-1">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Slide Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentSlide ? "bg-blue-600" : "bg-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Download Section */}
      <div className="card mt-8 text-center">
        <h3 className="text-xl font-semibold mb-4">Download Pitch Deck</h3>
        <p className="text-slate-600 mb-6">
          Get the complete AuditDNA pitch deck as a PDF for offline viewing and sharing.
        </p>
        <button className="btn-primary">
          📥 Download PDF
        </button>
      </div>
    </div>
  );
}