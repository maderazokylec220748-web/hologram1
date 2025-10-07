# Westmead International School - Hologram Scanner Kiosk

## Overview
An interactive hologram scanner kiosk web application with AI assistant for Westmead International School. The AI assistant is powered by Groq (free alternative to OpenAI) and is restricted to answering only school-related inquiries.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your Groq API key
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

The app will be available at http://localhost:5000

## Features
- **Fullscreen Hologram Display**: Large-scale hologram appears fullscreen when AI responds, hiding all other UI elements for immersive experience
- **Intelligent Timer System**: Hologram display duration automatically calculated based on response length (base 3s + 0.5s per 50 chars, max 15s)
- **Scalable Hologram Sizes**: Hologram components support both small (chat) and large (fullscreen) display modes
- **AI Voice Synthesis**: AI responses are spoken aloud using Puter.js free Text-to-Speech API (unlimited, no API key required)
- **Holographic Scanner Interface**: Futuristic scanning simulation with animations
- **AI Chat Assistant**: Groq-powered chatbot with school-specific context
- **4-Sided Hologram Display**: AI responses shown in a 3D prism with all 4 sides visible
- **School-Topic Filtering**: Automatically detects and redirects non-school questions
- **Responsive Kiosk Design**: Optimized for touchscreen interaction

## Environment Variables
Create a `.env` file with:
- `GROQ_API_KEY` - Get free at https://console.groq.com/
- `SESSION_SECRET` - Any random string for security

## School Context
The AI assistant has knowledge about:
- Westmead International School (Batangas City, Philippines)
- First international school accredited by DepEd, TESDA, and CHED
- Founded in 2004, became Westmead in 2006
- Courses from pre-elementary to college level
- Admission procedures and requirements
- Campus facilities and resources

## Technology Stack
- **Frontend**: React + TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **AI**: Groq API (Llama 3.3 70B Versatile)
- **Storage**: In-memory storage (MemStorage)

## Project Structure
- `/client` - React frontend application
  - `/src/components` - Reusable UI components (Scanner, Chat, Header)
  - `/src/pages` - Main kiosk page
- `/server` - Express backend
  - `openai.ts` - Groq AI integration with comprehensive school context
  - `routes.ts` - API endpoints for chat functionality
  - `storage.ts` - In-memory message storage
- `/shared` - Shared TypeScript schemas

## API Endpoints
- `POST /api/chat` - Send a message to the AI assistant
- `GET /api/chat/history` - Retrieve chat history
- `POST /api/chat/reset` - Reset chat session

## Environment Variables
- `GROQ_API_KEY` - Groq API key (required) - Free alternative to OpenAI for chat
- `SESSION_SECRET` - Session secret for security

## Text-to-Speech
- Uses Puter.js free API (unlimited, no API key required)
- Automatically speaks AI responses
- Toggle on/off with speaker icon in chat

## AI Knowledge Base
The chatbot now includes comprehensive information from https://westmead-is.edu.ph including:
- All 7 colleges and 30+ degree programs
- Tuition fees (₱1,500/unit for A.Y. 2025-2026)
- Enrollment requirements and procedures
- Scholarship programs (Gawad Kabataan, Academic, Athletic, etc.)
- Contact information and location details
- Entrance exam requirements (board vs. non-board programs)
- Payment options and bank account details

## Recent Changes (October 7, 2025)

### Latest Update - Fullscreen Hologram Display
- **Implemented Fullscreen Hologram Mode**: When AI responds, a large-scale hologram avatar takes over the entire screen, hiding all other UI (header, chat, input)
- **Avatar-Only Display**: Only the hologram avatar image is shown fullscreen - AI's text responses remain in the chat (background)
- **Intelligent Timer System**: Display duration automatically calculated based on response length (3s base + 0.5s per 50 characters, capped at 15 seconds)
- **Enlarged Hologram Avatar**: 
  - Avatar panels scaled up to 48x64 pixels (from 20x28)
  - 4-sided rotating hologram prism for immersive display
- **Enhanced User Experience**: Hologram automatically hides after calculated duration and returns to chat interface with AI's text response visible

### Previous Updates
- **Implemented Pepper's Ghost Hologram Effect**: Hologram is now hidden until user asks a question (perfect for glass reflection displays)
- **Added Puter.js Text-to-Speech**: AI responses are now spoken using free, unlimited voice synthesis (no API key required)
- **Integrated comprehensive school data** from official WIS website (https://westmead-is.edu.ph)
- Added all college programs, tuition fees, and enrollment requirements to AI context
- Enhanced chatbot with detailed information about scholarships, payment options, and admission procedures
- Updated school context with contact details, locations, and program-specific requirements
- Switched from OpenAI to Groq API for free AI chat functionality
- Updated to use Llama 3.3 70B model via Groq
- Implemented school-topic filtering to restrict AI responses
- Created holographic UI with scanner and chat interfaces
