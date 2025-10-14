# Visual Studio Code Setup Guide

This guide will help you run this School Chatbot application on your local machine using Visual Studio Code.

## Prerequisites

1. **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
2. **PostgreSQL** (v14 or higher) - [Download here](https://www.postgresql.org/download/)
3. **Visual Studio Code** - [Download here](https://code.visualstudio.com/)

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run the installer and remember your password for the `postgres` user
3. Default port is `5432` (keep this unless you have a conflict)

### macOS
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Step 2: Create the Database

1. Open PostgreSQL command line (psql):
   ```bash
   # Windows: Use "SQL Shell (psql)" from Start menu
   # macOS/Linux:
   psql -U postgres
   ```

2. Create the database:
   ```sql
   CREATE DATABASE school_chatbot;
   \q
   ```

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and update these values:

   ```env
   # Update with your PostgreSQL credentials
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/school_chatbot
   
   # Add your OpenAI API key from https://platform.openai.com/
   OPENAI_API_KEY=sk-your-actual-openai-key-here
   
   # Generate a random secret (you can use any random string)
   SESSION_SECRET=your_super_secret_random_string_here
   ```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Initialize Database Schema

Push the database schema to your PostgreSQL database:

```bash
npm run db:push
```

This will create all necessary tables (users, chat_messages, professors, events, etc.)

## Step 6: Build the Application

Before running with `npm start`, you need to build the application:

```bash
npm run build
```

This creates the production-ready files in the `dist` folder.

## Step 7: Run the Application

### Development Mode (with hot reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The application will be available at: **http://localhost:5000**

## Troubleshooting

### Database Connection Error
- **Error**: "DATABASE_URL is not set"
  - **Solution**: Make sure you created the `.env` file and set DATABASE_URL

- **Error**: "password authentication failed"
  - **Solution**: Check your PostgreSQL password in the DATABASE_URL

- **Error**: "database does not exist"
  - **Solution**: Create the database using `CREATE DATABASE school_chatbot;` in psql

### OpenAI API Error
- **Error**: "Missing credentials"
  - **Solution**: Add your OpenAI API key to `.env` file

### Port Already in Use
- **Error**: "Port 5000 is already in use"
  - **Solution**: Change PORT in `.env` file to another port (e.g., 3000)

## Alternative: Using Neon (Serverless PostgreSQL)

If you don't want to install PostgreSQL locally, you can use Neon:

1. Sign up at https://neon.tech (free tier available)
2. Create a new project
3. Copy the connection string
4. Update your `.env` file:
   ```env
   DATABASE_URL=your-neon-connection-string
   ```

## Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and schemas
├── migrations/      # Database migrations
└── dist/           # Built production files (created after npm run build)
```

## Available Scripts

- `npm run dev` - Run development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server (requires build first)
- `npm run db:push` - Push schema changes to database
- `npm run check` - Type check with TypeScript

## Need Help?

If you encounter any issues not covered here, please check:
- Your PostgreSQL service is running
- Your `.env` file has all required variables
- You ran `npm install` to install dependencies
- You ran `npm run build` before using `npm start`
