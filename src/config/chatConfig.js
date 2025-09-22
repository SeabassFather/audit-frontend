/**
 * Configuration for AuditDNA Chat Assistant
 * 
 * This file contains settings and configurations for the ChatGPT-style 
 * conversational AI assistant integrated into the AuditDNA platform.
 */

// Default system prompt for the AI assistant
export const DEFAULT_SYSTEM_PROMPT = `You are an expert assistant for AuditDNA, a compliance and auditing platform. Help users with questions about:

- Compliance frameworks (GDPR, CCPA, GLBA, PIPEDA, SOX, etc.)
- Auditing processes and methodologies
- Regulatory requirements and updates
- Data privacy and protection
- Financial regulations and reporting
- Risk assessment and management
- Loan products and services
- Banking and financial compliance

Provide clear, actionable advice while being professional and knowledgeable. If you're unsure about specific legal requirements, advise users to consult with compliance professionals.`;

// Chat configuration
export const CHAT_CONFIG = {
  // Maximum number of messages to display in chat history
  maxMessages: 50,
  
  // Maximum character limit for user input
  maxInputLength: 1000,
  
  // Typing delay for realistic response simulation (ms)
  typingDelay: 1000,
  
  // Auto-scroll behavior
  autoScroll: true,
  
  // Welcome message
  welcomeMessage: "Welcome to AuditDNA Chat Assistant! I can help you with compliance, auditing, and regulatory questions.",
  
  // Error messages
  errorMessages: {
    apiError: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
    networkError: "Network connection issue. Please check your connection and try again.",
    rateLimitError: "I'm receiving too many requests. Please wait a moment and try again.",
    invalidInput: "Please enter a valid message."
  }
};

// API configuration (for frontend use)
export const API_CONFIG = {
  // Netlify function endpoint
  endpoint: '/.netlify/functions/chatgpt',
  
  // Request timeout (ms)
  timeout: 30000,
  
  // Retry configuration
  maxRetries: 2,
  retryDelay: 1000
};

// UI configuration
export const UI_CONFIG = {
  // Widget dimensions
  widget: {
    width: '384px', // w-96
    height: '384px', // h-96
    maxHeight: '80vh'
  },
  
  // Colors (using Tailwind classes)
  colors: {
    primary: 'dnaBlue',
    accent: 'dnaGreen',
    background: 'white',
    text: 'slate-800'
  },
  
  // Animation settings
  animations: {
    slideIn: true,
    fadeIn: true,
    bounce: true
  }
};

// Feature flags for extending functionality
export const FEATURE_FLAGS = {
  // Enable file attachments (future feature)
  fileAttachments: false,
  
  // Enable voice input/output (future feature)
  voiceSupport: false,
  
  // Enable conversation history persistence (future feature)
  persistHistory: false,
  
  // Enable context awareness (future feature)
  contextAwareness: false,
  
  // Enable function calling (future feature)
  functionCalling: false,
  
  // Enable user authentication integration (future feature)
  userAuth: false
};

export default {
  DEFAULT_SYSTEM_PROMPT,
  CHAT_CONFIG,
  API_CONFIG,
  UI_CONFIG,
  FEATURE_FLAGS
};