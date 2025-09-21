export default function Marketing() {
  const features = [
    {
      title: "275+ Audit Services",
      description: "Comprehensive auditing across Agriculture, Mortgage, Medical, Legal, and Business sectors",
      icon: "🔍"
    },
    {
      title: "CFPB-Aware Compliance",
      description: "Built-in compliance tools that understand regulatory requirements",
      icon: "⚖️"
    },
    {
      title: "Real-time USDA Pricing",
      description: "Up-to-date commodity pricing with W1W26 and 5-year averages",
      icon: "📊"
    },
    {
      title: "AI-Powered Analysis",
      description: "ChatGPT integration for intelligent document analysis and insights",
      icon: "🤖"
    },
    {
      title: "Secure Document Upload",
      description: "OCR-enabled document processing with ID verification",
      icon: "📁"
    },
    {
      title: "Professional Reports",
      description: "Detailed audit reports and compliance documentation",
      icon: "📋"
    }
  ];

  const testimonials = [
    {
      quote: "AuditDNA transformed our compliance process. The CFPB-aware tools saved us countless hours.",
      author: "Sarah Johnson",
      company: "Regional Credit Union",
      role: "Compliance Director"
    },
    {
      quote: "The agricultural audit services are comprehensive and accurate. Perfect for our farming operations.",
      author: "Mike Chen",
      company: "Green Valley Farms",
      role: "Operations Manager"
    },
    {
      quote: "Document upload and OCR processing made our audit workflow incredibly efficient.",
      author: "Lisa Rodriguez",
      company: "MedTech Solutions",
      role: "Quality Assurance Lead"
    }
  ];

  const stats = [
    { number: "275+", label: "Audit Services" },
    { number: "50K+", label: "Documents Processed" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            AuditDNA Platform
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Modern auditing platform for Agriculture, Mortgage, Compliance, and more. 
            Streamline your audit process with AI-powered tools and comprehensive service coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="btn-primary text-lg px-8 py-3">
              Browse Services
            </a>
            <a href="/chat" className="btn-outline text-lg px-8 py-3">
              Try AI Assistant
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-12 rounded-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Why Choose AuditDNA?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="card-hover text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-slate-50 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
          Service Categories
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Agriculture", count: "75+", color: "green" },
            { name: "Mortgage", count: "50+", color: "blue" },
            { name: "Medical", count: "60+", color: "red" },
            { name: "Legal", count: "45+", color: "purple" },
            { name: "Business", count: "30+", color: "yellow" },
            { name: "Education", count: "15+", color: "indigo" }
          ].map((category, i) => (
            <div key={i} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${category.color}-100 flex items-center justify-center`}>
                <span className={`text-2xl font-bold text-${category.color}-600`}>{category.count}</span>
              </div>
              <h3 className="font-semibold text-slate-800">{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="card-hover">
              <div className="text-slate-600 mb-4 italic">"{testimonial.quote}"</div>
              <div className="font-semibold text-slate-800">{testimonial.author}</div>
              <div className="text-sm text-slate-500">{testimonial.role}</div>
              <div className="text-sm text-blue-600">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4 text-slate-800">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Join thousands of organizations using AuditDNA for their compliance and auditing needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/services" className="btn-primary text-lg px-8 py-3">
            Explore Services
          </a>
          <a href="/uploads" className="btn-secondary text-lg px-8 py-3">
            Upload Documents
          </a>
          <a href="/admin" className="btn-outline text-lg px-8 py-3">
            Contact Sales
          </a>
        </div>
      </section>
    </div>
  );
}