# Hologram Scanner Kiosk

## Overview

A futuristic, sci-fi inspired interactive kiosk application for Westmead International School. The application features a holographic-themed interface with a barcode/QR scanner and an AI-powered chat assistant that answers school-related questions. Built with React, Express, and OpenAI integration, the system provides students and visitors with an engaging way to access information about courses, campus facilities, admissions, and general school inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR support
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and data fetching

**UI Components & Styling**
- **Shadcn/ui** component library (New York style variant) with Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Design System**: Futuristic holographic theme inspired by sci-fi interfaces (JARVIS, Minority Report)
  - Dark mode primary with cyan-blue holographic glows and purple accents
  - Typography: Space Grotesk for headings, Inter for UI, JetBrains Mono for data displays
  - Custom CSS variables for theme consistency and glass-morphism effects

**Key Features**
- Fullscreen kiosk layout optimized for touchscreen interaction (minimum 64px touch targets)
- Tabbed interface switching between Scanner and AI Assistant views
- Real-time chat interface with message history
- Animated holographic backgrounds with grid patterns and floating elements
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript running on Node.js
- ESM module system for modern JavaScript features
- Custom middleware for request logging and error handling

**API Design**
- RESTful endpoints for chat functionality:
  - `POST /api/chat` - Send messages and receive AI responses
  - `GET /api/chat/history` - Retrieve conversation history
  - `POST /api/chat/reset` - Clear chat session
- JSON request/response format
- Session-based conversation management

**AI Integration**
- **OpenAI GPT-5** integration for natural language processing
- Context-aware responses specific to Westmead International School
- Built-in safety filters to only answer school-related and educational questions
- Conversation history maintained for context continuity

**Data Storage Strategy**
- In-memory storage implementation (`MemStorage`) for development/demo
- Database-ready architecture with Drizzle ORM for future PostgreSQL integration
- Schema defined for users and chat messages with UUID primary keys
- Storage abstraction layer (`IStorage` interface) allows easy switching between implementations

### External Dependencies

**Third-Party Services**
- **OpenAI API** (GPT-5 model) - Natural language AI responses with school-specific context
- **Neon Database** (configured but not actively used) - Serverless PostgreSQL via `@neondatabase/serverless`

**Key Libraries**
- **@radix-ui/** - Accessible UI component primitives (dialogs, dropdowns, tabs, etc.)
- **react-hook-form** with Zod validation for form management
- **drizzle-orm** and **drizzle-kit** for database ORM and migrations
- **class-variance-authority** and **clsx** for conditional styling
- **embla-carousel-react** for carousel components
- **date-fns** for date manipulation

**Development Tools**
- **TypeScript** for static type checking across client and server
- **Vite plugins**: Runtime error overlay, Replit-specific development enhancements
- **ESBuild** for production server bundling
- **PostCSS** with Autoprefixer for CSS processing

**Database Configuration**
- Drizzle ORM configured for PostgreSQL dialect
- Migration system ready with schema in `/shared/schema.ts`
- Connection configured via `DATABASE_URL` environment variable
- Currently using in-memory storage; PostgreSQL can be enabled by provisioning database