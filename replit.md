# Westmead International School - Hologram Scanner Kiosk

## Overview
An interactive hologram scanner kiosk web application with AI assistant for Westmead International School. The AI assistant is restricted to answering only school-related inquiries, pulling information from the official Westmead International School website.

## Features
- **Holographic Scanner Interface**: Futuristic scanning simulation with animations
- **AI Chat Assistant**: OpenAI-powered chatbot with school-specific context
- **School-Topic Filtering**: Automatically detects and redirects non-school questions
- **Responsive Kiosk Design**: Optimized for touchscreen interaction
- **Tab Navigation**: Switch between Scanner and AI Assistant modes

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
- **AI**: OpenAI GPT-5
- **Storage**: In-memory storage (MemStorage)

## Project Structure
- `/client` - React frontend application
  - `/src/components` - Reusable UI components (Scanner, Chat, Header)
  - `/src/pages` - Main kiosk page
- `/server` - Express backend
  - `openai.ts` - OpenAI integration with school context
  - `routes.ts` - API endpoints for chat functionality
  - `storage.ts` - In-memory message storage
- `/shared` - Shared TypeScript schemas

## API Endpoints
- `POST /api/chat` - Send a message to the AI assistant
- `GET /api/chat/history` - Retrieve chat history
- `POST /api/chat/reset` - Reset chat session

## Environment Variables
- `GROQ_API_KEY` - Groq API key (required) - Free alternative to OpenAI
- `SESSION_SECRET` - Session secret for security

## Recent Changes (October 6, 2025)
- Switched from OpenAI to Groq API for free AI chat functionality
- Updated to use Llama 3.3 70B model via Groq
- Fixed host binding issues for better macOS compatibility
- Integrated Westmead International School website content as AI context
- Implemented school-topic filtering to restrict AI responses
- Created holographic UI with scanner and chat interfaces
- Set up OpenAI GPT-5 integration with conversation history
