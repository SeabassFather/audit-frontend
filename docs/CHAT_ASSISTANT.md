# AuditDNA Chat Assistant Documentation

## Overview

The AuditDNA Chat Assistant is a ChatGPT-style conversational AI widget integrated into the AuditDNA platform. It provides users with instant support and guidance on compliance, auditing, and regulatory matters.

## Features

- **Persistent Chat Widget**: Accessible from all pages via a floating button
- **OpenAI Integration**: Uses GPT-3.5-turbo for intelligent responses
- **Responsive Design**: Works on desktop and mobile devices
- **Professional Styling**: Matches AuditDNA Elite design system
- **Error Handling**: Graceful error handling with user-friendly messages
- **Configuration Management**: Centralized configuration for easy customization

## Setup and Configuration

### 1. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Configure your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Netlify Functions

The chat backend is implemented as a Netlify function. Ensure you have:

- OpenAI API key set in Netlify environment variables
- Proper CORS configuration for your domain

### 3. Configuration File

Modify `src/config/chatConfig.js` to customize:

- System prompts
- UI settings
- API configuration
- Feature flags

## Architecture

### Components

- **ChatGPT.jsx**: Main chat widget component
- **chatConfig.js**: Configuration file
- **netlify/functions/chatgpt.js**: Backend API handler

### State Management

The chat uses React local state for:
- Message history (in-memory for MVP)
- Loading states
- UI state (open/closed)

### API Flow

1. User enters message in chat widget
2. Frontend validates input and adds to message history
3. Message sent to Netlify function endpoint
4. Netlify function calls OpenAI API
5. Response processed and displayed in chat

## Extending the Assistant

### Adding New Features

The configuration file includes feature flags for future enhancements:

#### 1. File Attachments

```javascript
// Enable in chatConfig.js
FEATURE_FLAGS.fileAttachments = true;

// Extend ChatGPT component to handle file uploads
const handleFileUpload = (file) => {
  // Process file and send to API
};
```

#### 2. Context Awareness

```javascript
// Enable context awareness
FEATURE_FLAGS.contextAwareness = true;

// Modify sendMessage to include page context
const sendMessage = async () => {
  const context = {
    currentPage: window.location.pathname,
    userRole: getCurrentUser()?.role,
    // Add more context as needed
  };
  
  // Include context in API call
};
```

#### 3. Function Calling

Enable the assistant to perform actions:

```javascript
// Define available functions
const AVAILABLE_FUNCTIONS = {
  searchDocuments: async (query) => {
    // Search through documents
    return await searchAPI(query);
  },
  
  scheduleAudit: async (details) => {
    // Schedule an audit
    return await auditAPI.schedule(details);
  }
};

// Update API to handle function calls
```

#### 4. Persistent History

```javascript
// Enable persistent history
FEATURE_FLAGS.persistHistory = true;

// Add localStorage/IndexedDB integration
const saveConversation = (messages) => {
  localStorage.setItem('auditdna_chat_history', JSON.stringify(messages));
};

const loadConversation = () => {
  const saved = localStorage.getItem('auditdna_chat_history');
  return saved ? JSON.parse(saved) : [];
};
```

#### 5. Voice Support

```javascript
// Enable voice features
FEATURE_FLAGS.voiceSupport = true;

// Add speech recognition and synthesis
const startVoiceRecognition = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInputValue(transcript);
  };
  recognition.start();
};
```

### Custom System Prompts

Modify the system prompt in `chatConfig.js` for different contexts:

```javascript
export const CONTEXT_PROMPTS = {
  audit: "You are helping with audit-specific questions...",
  compliance: "You are focusing on compliance matters...",
  loans: "You are assisting with loan-related inquiries...",
};

// Use context-specific prompts
const getSystemPrompt = (context) => {
  return CONTEXT_PROMPTS[context] || DEFAULT_SYSTEM_PROMPT;
};
```

### Styling Customization

The chat widget uses Tailwind CSS. Customize colors in `tailwind.config.js`:

```javascript
colors: {
  dnaBlue: "#your-custom-blue",
  dnaGreen: "#your-custom-green",
  // Add more custom colors
}
```

### API Customization

To use a different AI provider, modify the Netlify function:

```javascript
// Example: Azure OpenAI integration
const response = await fetch(process.env.AZURE_OPENAI_ENDPOINT, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.AZURE_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // Azure OpenAI format
  })
});
```

## Security Considerations

### Environment Variables

- Never expose API keys in frontend code
- Use Netlify environment variables for sensitive data
- Rotate API keys regularly

### Input Validation

- Implement rate limiting
- Validate message length and content
- Sanitize user inputs

### CORS Configuration

- Configure proper CORS headers
- Restrict to specific domains in production

## Troubleshooting

### Common Issues

1. **Chat not appearing**: Check if ChatGPT component is imported in App.jsx
2. **API errors**: Verify OpenAI API key is set correctly
3. **Styling issues**: Ensure dnaBlue color is defined in Tailwind config
4. **Build errors**: Check all imports and dependencies

### Debug Mode

Enable debug logging:

```javascript
// In chatConfig.js
export const DEBUG_MODE = process.env.NODE_ENV === 'development';

// In component
if (DEBUG_MODE) {
  console.log('Chat state:', { messages, isLoading, isOpen });
}
```

## Performance Optimization

### Message Limiting

- Implement message history limits (configured in CHAT_CONFIG.maxMessages)
- Consider pagination for long conversations

### API Caching

- Cache common responses
- Implement request deduplication

### Lazy Loading

- Load chat component only when needed
- Optimize bundle size

## Accessibility

The chat widget includes:

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color scheme
- Focus management

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## License and Usage

This implementation is designed for the AuditDNA platform. Ensure compliance with:

- OpenAI API terms of service
- Data privacy regulations
- Company security policies