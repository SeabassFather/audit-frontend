import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! I'm AuditDNA's AI Assistant. How can I help you with auditing, compliance, or our services today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    const userMsg = { role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    
    try {
      // Simulate API call - replace with actual ChatGPT API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botResponse = {
        role: "assistant",
        content: `I understand you're asking about "${userMsg.content}". Here's how I can help:\n\n• Browse our 275+ audit services\n• Explain compliance requirements\n• Guide you through document uploads\n• Help with USDA pricing information\n• Answer questions about our audit engines\n\nWhat specific area would you like to explore?`
      };
      setMessages(m => [...m, botResponse]);
    } catch (err) {
      setMessages(m => [...m, { role: "assistant", content: "Sorry, I'm experiencing technical difficulties. Please try again or contact support." }]);
    }
    
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI Chat Assistant</h1>
            <p className="text-slate-600">Get instant help with auditing, compliance, and platform features</p>
          </div>
        </div>

        <div className="chatgpt-container">
          <div className="chatgpt-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role}`}>
                <span className="whitespace-pre-wrap">{msg.content}</span>
              </div>
            ))}
            {loading && (
              <div className="msg assistant">
                <span className="flex items-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full"></div>
                  Thinking...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <form className="chatgpt-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about auditing, compliance, services..."
              disabled={loading}
              className="flex-1 input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary"
            >
              {loading ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card-hover">
          <h3 className="font-semibold text-slate-800 mb-2">Quick Questions</h3>
          <div className="space-y-2">
            {[
              "What audit services do you offer?",
              "How do I upload documents?",
              "Explain CFPB compliance",
              "Show me USDA pricing"
            ].map((question, i) => (
              <button
                key={i}
                onClick={() => setInput(question)}
                className="text-left w-full p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="card-hover">
          <h3 className="font-semibold text-slate-800 mb-2">Popular Topics</h3>
          <div className="flex flex-wrap gap-2">
            {["Agriculture", "Mortgage", "Compliance", "Medical", "Legal", "USDA"].map((topic) => (
              <span key={topic} className="badge-green">{topic}</span>
            ))}
          </div>
        </div>

        <div className="card-hover">
          <h3 className="font-semibold text-slate-800 mb-2">Need Help?</h3>
          <div className="space-y-2">
            <a href="/services" className="block text-sm text-blue-600 hover:underline">Browse Services</a>
            <a href="/uploads" className="block text-sm text-blue-600 hover:underline">Upload Documents</a>
            <a href="/admin" className="block text-sm text-blue-600 hover:underline">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}