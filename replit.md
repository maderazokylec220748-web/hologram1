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
- **Multi-Language Support**: Users choose between English and Tagalog on first visit, with preference saved to localStorage
- **Fully Localized UI**: All interface elements, messages, and AI responses adapt to selected language
- **Fullscreen Hologram Display**: Large-scale hologram appears fullscreen when AI responds, with chat messages remaining visible in the background
- **Persistent Chat History**: Questions and answers stay visible behind the hologram overlay for continuous context
- **Intelligent Timer System**: Hologram display duration automatically calculated based on response length (base 3s + 0.5s per 50 chars, max 15s)
- **Scalable Hologram Sizes**: Hologram components support both small (chat) and large (fullscreen) display modes
- **AI Voice Synthesis**: AI responses are spoken aloud using Puter.js free Text-to-Speech API (unlimited, no API key required)
- **Holographic Scanner Interface**: Futuristic scanning simulation with animations
- **AI Chat Assistant**: Groq-powered chatbot with school-specific context
- **4-Sided Hologram Display**: AI responses shown in a 3D prism with all 4 sides visible
- **School-Topic Filtering**: Automatically detects and redirects non-school questions
- **Responsive Kiosk Design**: Optimized for touchscreen interaction
- **Welcome Greeting**: Friendly welcome message displayed when chat is empty
- **Admin Dashboard**: Full-featured admin interface at `/admin` for managing school settings and viewing analytics

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
  - `/src/pages` - Application pages (Kiosk, Admin)
- `/server` - Express backend
  - `openai.ts` - Groq AI integration with comprehensive school context
  - `routes.ts` - API endpoints for chat and admin functionality
  - `storage.ts` - In-memory storage for messages and settings
- `/shared` - Shared TypeScript schemas

## API Endpoints

### Chat Endpoints
- `POST /api/chat` - Send a message to the AI assistant
- `GET /api/chat/history` - Retrieve chat history
- `POST /api/chat/reset` - Reset chat session

### Admin Endpoints
- `GET /api/admin/settings` - Get school settings
- `PUT /api/admin/settings` - Update school settings
- `GET /api/admin/analytics` - Get chat analytics and recent messages

## Environment Variables
- `GROQ_API_KEY` - Groq API key (required) - Free alternative to OpenAI for chat
- `SESSION_SECRET` - Session secret for security

## Text-to-Speech
- Uses browser's built-in Web Speech API (no API key required)
- **Language-Aware Voice Selection**: Automatically selects appropriate voices based on selected language
  - **Tagalog Mode**: Prioritizes Filipino/Tagalog voices when available (Rosa, Angelo, etc.)
  - **English Mode**: Intelligent male voice selection across platforms (Windows, macOS, Linux)
- Comprehensive voice pattern matching across 40+ voice names
- Lowered pitch (0.8) for more masculine sound
- 1.1x playback speed for faster responses
- Automatically speaks AI responses
- Toggle on/off with speaker icon in chat
- Stop button appears while speaking to cancel speech midway
- Dynamic voice switching when language is changed

## AI Knowledge Base
The chatbot now includes comprehensive information from https://westmead-is.edu.ph including:
- All 7 colleges and 30+ degree programs
- Tuition fees (₱1,500/unit for A.Y. 2025-2026)
- Enrollment requirements and procedures
- Scholarship programs (Gawad Kabataan, Academic, Athletic, etc.)
- Contact information and location details
- Entrance exam requirements (board vs. non-board programs)
- Payment options and bank account details

## Admin Dashboard
The application includes a comprehensive admin dashboard accessible at `/admin`:

### Features:
- **School Settings Management**: Update school information including name, motto, contact details, and address
- **Chat Analytics**: View real-time statistics on chat interactions
  - Total messages count
  - User messages vs AI responses breakdown
  - Recent message history viewer
- **Futuristic Design**: Matches the holographic kiosk aesthetic with dark mode UI
- **Form Validation**: Built-in validation using Zod schemas
- **Real-time Updates**: Changes save immediately with success notifications

### Database Schema:
- `adminSettings` table stores school configuration
- In-memory storage with default WIS data pre-populated
- Analytics calculated from chat message history

### Usage:
1. Navigate to `/admin` to access the dashboard
2. Update school information in the form
3. Click "Save Settings" to persist changes
4. View analytics on chat interactions in real-time
5. Click "Back to Kiosk" to return to the main interface

## Recent Changes

### Latest Update - October 14, 2025: Admin Dashboard
- **New Admin Interface**: Added comprehensive admin dashboard at `/admin` route
- **School Settings Management**: Form to update school name, motto, contact email, phone, and address
- **Chat Analytics Dashboard**: Real-time view of message statistics and recent conversations
- **Database Schema Extension**: Added `adminSettings` table for configuration storage
- **API Endpoints**: New admin routes for settings management and analytics
- **Responsive Design**: Dark-themed UI matching the holographic kiosk aesthetic

### Previous Update - October 9, 2025: Tagalog Voice Support
- **Language-Aware TTS**: Voice selection now adapts to selected language (English or Tagalog)
- **Tagalog Voice Priority**: When Tagalog is selected, system prioritizes Filipino/Tagalog voices (Rosa, Angelo, etc.)
- **Dynamic Voice Switching**: Voice automatically updates when user changes language preference
- **Graceful Fallback**: Falls back to male English voices when Tagalog voices are unavailable
- **Enhanced Logging**: Console logs show selected voice and language for debugging

### Earlier - October 9, 2025: Improved Male Voice Selection
- **Enhanced Voice Selection**: Upgraded to intelligent male voice detection across all platforms
- **Comprehensive Voice Database**: Added support for 40+ male voice patterns (Microsoft, Google, macOS)
- **Female Voice Filtering**: Automatically excludes 30+ known female voices from selection
- **Lower Pitch**: Set pitch to 0.8 for more masculine sound regardless of selected voice
- **Platform Support**: Works across Windows (Microsoft voices), macOS (Apple voices), and Chrome/Edge (Google voices)

### October 8, 2025: Enhanced Text-to-Speech
- **Male Voice**: Changed AI voice to male (Matthew) for better user experience
- **Faster Speech**: Increased playback speed to 1.3x (30% faster) for quicker responses
- **Stop Button**: Added red stop button that appears while AI is speaking, allowing users to stop speech midway

### Multi-Language Support (English & Tagalog)
- **Language Selection Dialog**: On first visit, users are prompted to choose between English or Tagalog
- **Persistent Language Preference**: Selected language is stored in localStorage for future sessions
- **Fully Localized UI**: All interface elements adapt to selected language including:
  - Welcome greeting and instructions
  - Input placeholder text
  - Warning messages
  - Toast notifications (errors, system messages)
  - Button aria-labels for accessibility
- **AI Responses in Selected Language**: Backend AI generates responses in the user's chosen language
- **Bilingual Error Messages**: Non-school-related questions receive polite redirection in appropriate language

### Previous Update - Fullscreen Hologram Display
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
