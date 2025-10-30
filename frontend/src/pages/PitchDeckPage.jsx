import React, { useState } from "react";

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const pitchSlides = [
    {
      title: "AuditDNA Platform",
      subtitle: "Comprehensive Audit & Compliance Solutions",
      content: "Transforming how businesses handle mortgage, agriculture, and trade finance auditing through technology and expertise.",
<<<<<<< HEAD
      image: "📊"
=======
      image: "Ã°Å¸â€œÅ "
>>>>>>> my/push-branch
    },
    {
      title: "The Problem",
      subtitle: "Costly Errors & Compliance Gaps",
<<<<<<< HEAD
      content: "• 75% of mortgage files contain errors\n• Agricultural compliance violations cost $50K+ annually\n• Small businesses lose 20% cash flow to delayed payments",
      image: "⚠️"
=======
      content: "Ã¢â‚¬Â¢ 75% of mortgage files contain errors\nÃ¢â‚¬Â¢ Agricultural compliance violations cost $50K+ annually\nÃ¢â‚¬Â¢ Small businesses lose 20% cash flow to delayed payments",
      image: "Ã¢Å¡Â Ã¯Â¸Â"
>>>>>>> my/push-branch
    },
    {
      title: "Our Solution",
      subtitle: "Automated Audit & Compliance Platform",
<<<<<<< HEAD
      content: "• AI-powered document analysis\n• Real-time compliance monitoring\n• Integrated financial solutions\n• Expert human oversight",
      image: "🎯"
=======
      content: "Ã¢â‚¬Â¢ AI-powered document analysis\nÃ¢â‚¬Â¢ Real-time compliance monitoring\nÃ¢â‚¬Â¢ Integrated financial solutions\nÃ¢â‚¬Â¢ Expert human oversight",
      image: "Ã°Å¸Å½Â¯"
>>>>>>> my/push-branch
    },
    {
      title: "Market Opportunity",
      subtitle: "$2.5B Addressable Market",
<<<<<<< HEAD
      content: "• Mortgage auditing: $800M market\n• Agriculture compliance: $1.2B market\n• Trade finance: $500M market\n• Growing 15% annually",
      image: "📈"
=======
      content: "Ã¢â‚¬Â¢ Mortgage auditing: $800M market\nÃ¢â‚¬Â¢ Agriculture compliance: $1.2B market\nÃ¢â‚¬Â¢ Trade finance: $500M market\nÃ¢â‚¬Â¢ Growing 15% annually",
      image: "Ã°Å¸â€œË†"
>>>>>>> my/push-branch
    },
    {
      title: "Revenue Streams",
      subtitle: "Multiple Income Sources",
<<<<<<< HEAD
      content: "• Per-audit fees: $500-$5,000\n• Subscription services: $200-$2,000/month\n• Success-based fees: 20-30% of recoveries\n• Partnership referrals: 5-15%",
      image: "💰"
=======
      content: "Ã¢â‚¬Â¢ Per-audit fees: $500-$5,000\nÃ¢â‚¬Â¢ Subscription services: $200-$2,000/month\nÃ¢â‚¬Â¢ Success-based fees: 20-30% of recoveries\nÃ¢â‚¬Â¢ Partnership referrals: 5-15%",
      image: "Ã°Å¸â€™Â°"
>>>>>>> my/push-branch
    },
    {
      title: "Competitive Advantage",
      subtitle: "What Makes Us Different",
<<<<<<< HEAD
      content: "• Multi-industry expertise\n• Technology + human oversight\n• Proven track record\n• Integrated financial solutions\n• Scalable platform",
      image: "🏆"
=======
      content: "Ã¢â‚¬Â¢ Multi-industry expertise\nÃ¢â‚¬Â¢ Technology + human oversight\nÃ¢â‚¬Â¢ Proven track record\nÃ¢â‚¬Â¢ Integrated financial solutions\nÃ¢â‚¬Â¢ Scalable platform",
      image: "Ã°Å¸Ââ€ "
>>>>>>> my/push-branch
    },
    {
      title: "Traction",
      subtitle: "Growing Customer Base",
<<<<<<< HEAD
      content: "• 500+ completed audits\n• $15M in client recoveries\n• 95% client satisfaction\n• 40% month-over-month growth",
      image: "🚀"
=======
      content: "Ã¢â‚¬Â¢ 500+ completed audits\nÃ¢â‚¬Â¢ $15M in client recoveries\nÃ¢â‚¬Â¢ 95% client satisfaction\nÃ¢â‚¬Â¢ 40% month-over-month growth",
      image: "Ã°Å¸Å¡â‚¬"
>>>>>>> my/push-branch
    },
    {
      title: "Financial Projections",
      subtitle: "Path to Profitability",
      content: "Year 1: $500K revenue\nYear 2: $2M revenue\nYear 3: $8M revenue\nBreakeven: Month 18",
<<<<<<< HEAD
      image: "📊"
=======
      image: "Ã°Å¸â€œÅ "
>>>>>>> my/push-branch
    },
    {
      title: "Team",
      subtitle: "Experienced Leadership",
<<<<<<< HEAD
      content: "• CEO: 15 years financial services\n• CTO: Former fintech architect\n• COO: Compliance expert\n• 20+ experienced auditors",
      image: "👥"
=======
      content: "Ã¢â‚¬Â¢ CEO: 15 years financial services\nÃ¢â‚¬Â¢ CTO: Former fintech architect\nÃ¢â‚¬Â¢ COO: Compliance expert\nÃ¢â‚¬Â¢ 20+ experienced auditors",
      image: "Ã°Å¸â€˜Â¥"
>>>>>>> my/push-branch
    },
    {
      title: "Investment Ask",
      subtitle: "$2M Series A",
<<<<<<< HEAD
      content: "• Product development: 40%\n• Team expansion: 35%\n• Marketing & sales: 20%\n• Working capital: 5%",
      image: "💼"
=======
      content: "Ã¢â‚¬Â¢ Product development: 40%\nÃ¢â‚¬Â¢ Team expansion: 35%\nÃ¢â‚¬Â¢ Marketing & sales: 20%\nÃ¢â‚¬Â¢ Working capital: 5%",
      image: "Ã°Å¸â€™Â¼"
>>>>>>> my/push-branch
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlides.length) % pitchSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Presentation Mode */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {/* Slide Content */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-12 text-white min-h-96 flex flex-col justify-center">
          <div className="text-center">
            <div className="text-6xl mb-6">{pitchSlides[currentSlide].image}</div>
            <h1 className="text-4xl font-bold mb-4">{pitchSlides[currentSlide].title}</h1>
            <h2 className="text-xl mb-8 text-blue-100">{pitchSlides[currentSlide].subtitle}</h2>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 max-w-3xl mx-auto">
              <pre className="text-left whitespace-pre-wrap text-lg leading-relaxed">
                {pitchSlides[currentSlide].content}
              </pre>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {currentSlide + 1} of {pitchSlides.length}
            </span>
            <div className="flex space-x-1">
              {pitchSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === pitchSlides.length - 1}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg className="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slide Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Slide Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {pitchSlides.map((slide, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                index === currentSlide
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-2">{slide.image}</div>
              <div className="text-xs font-medium text-gray-700">{slide.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Presentation Tools */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Presentation Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-medium mb-2">
              Download PDF
            </button>
            <p className="text-sm text-gray-600">Get a PDF version for sharing</p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => {
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
                }
              }}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 font-medium mb-2"
            >
              Fullscreen Mode
            </button>
            <p className="text-sm text-gray-600">Present in fullscreen</p>
          </div>
          
          <div className="text-center">
            <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 font-medium mb-2">
              Share Link
            </button>
            <p className="text-sm text-gray-600">Share with investors</p>
          </div>
        </div>
      </div>

      {/* Speaker Notes */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Speaker Notes - Slide {currentSlide + 1}</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">
            {currentSlide === 0 && "Start with a strong opening. Introduce AuditDNA as the comprehensive solution for audit and compliance challenges across multiple industries."}
            {currentSlide === 1 && "Highlight the pain points that your audience can relate to. Use specific statistics to demonstrate the scope of the problem."}
            {currentSlide === 2 && "Show how your solution directly addresses each problem mentioned in the previous slide. Emphasize the technology + human expertise combination."}
            {currentSlide === 3 && "Present market data confidently. These numbers should excite investors about the opportunity size."}
            {currentSlide === 4 && "Break down your revenue model clearly. Show multiple income streams to demonstrate stability and growth potential."}
            {currentSlide === 5 && "Differentiate yourself from competitors. Explain why customers choose you over alternatives."}
            {currentSlide === 6 && "Use specific metrics to prove traction. This builds credibility and shows momentum."}
            {currentSlide === 7 && "Present realistic but ambitious projections. Be prepared to defend your assumptions."}
            {currentSlide === 8 && "Highlight team credentials and expertise. Investors bet on people as much as ideas."}
            {currentSlide === 9 && "Be specific about fund usage. Show you have a clear plan for the investment."}
          </p>
        </div>
      </div>
    </div>
  );
}