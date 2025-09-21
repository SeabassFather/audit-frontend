# AuditDNA Frontend

A modern React-based frontend for the AuditDNA compliance and auditing platform.

## Features

- **Dashboard**: Overview of compliance status and services
- **Services Management**: Browse and manage compliance services
- **Compliance Modules**: Access different compliance frameworks (GDPR, CCPA, GLBA, etc.)
- **ChatGPT Assistant**: AI-powered chatbot for compliance and auditing questions
- **Real-time Data**: Dynamic pricing and compliance data feeds

## ChatGPT Assistant

The platform includes an integrated ChatGPT-powered assistant that can help with:
- Compliance framework questions (GDPR, CCPA, GLBA, PIPEDA, etc.)
- Auditing process guidance
- Regulatory requirement clarification
- Data privacy best practices
- Financial regulation compliance

### ChatGPT Setup

1. **Obtain OpenAI API Key**: Sign up at [OpenAI](https://openai.com) and get an API key
2. **Configure Environment Variable**: Add your API key to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. **Deploy**: The chatbot works through a Netlify Function that securely communicates with OpenAI

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SeabassFather/audit-frontend.git
   cd audit-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```
   VITE_API_BASE=http://localhost:5050
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment

The application is designed to be deployed on Netlify with serverless functions:

1. **Connect to Netlify**: Link your GitHub repository to Netlify
2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set Environment Variables**: Add `OPENAI_API_KEY` in Netlify's environment settings
4. **Deploy**: Netlify will automatically deploy on push to main branch

## Technology Stack

- **React 18**: Frontend framework with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom styling
- **React Router**: Client-side routing
- **Recharts**: Charts and data visualization
- **Axios**: HTTP client for API calls
- **Netlify Functions**: Serverless backend for OpenAI integration

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── forms/              # Form components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── contexts/           # React contexts
├── ChatGPT.jsx         # ChatGPT assistant component
├── App.jsx             # Main app component
└── index.css           # Global styles

netlify/
└── functions/
    ├── chatgpt.js      # OpenAI integration function
    └── data.cjs        # Data management function
```

## Usage

### Accessing the ChatGPT Assistant

1. Look for the chat bubble icon in the bottom-right corner of any page
2. Click to open the chat interface
3. Type your compliance or auditing questions
4. The assistant will provide expert guidance based on your queries

### Example Questions for the ChatGPT Assistant

- "What are the key requirements for GDPR compliance?"
- "How do I handle a CCPA data deletion request?"
- "What documentation is needed for SOX compliance?"
- "Explain the difference between GDPR and CCPA data subject rights"

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions, please contact the AuditDNA team or use the integrated ChatGPT assistant for compliance-related queries.