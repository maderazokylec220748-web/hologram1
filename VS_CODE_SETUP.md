# Visual Studio Code Setup Guide

This guide will help you run this School Chatbot application on your local machine using Visual Studio Code.

## Prerequisites

1. **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
2. **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/mysql/)
3. **Visual Studio Code** - [Download here](https://code.visualstudio.com/)

## Step 1: Install MySQL

### Windows
1. Download MySQL installer from https://dev.mysql.com/downloads/mysql/
2. Run the installer and set a root password (remember this!)
3. Default port is `3306` (keep this unless you have a conflict)

### macOS
```bash
# Using Homebrew
brew install mysql
brew services start mysql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

## Step 2: Create the Database

1. Open MySQL command line:
   ```bash
   # Windows: Use "MySQL Command Line Client" from Start menu
   # macOS/Linux:
   mysql -u root -p
   ```

2. Create the database:
   ```sql
   CREATE DATABASE school_chatbot;
   exit;
   ```

## Step 3: Set Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and update these values:

   ```env
   # Update with your MySQL credentials
   DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/school_chatbot
   
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

Push the database schema to your MySQL database:

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

- **Error**: "Access denied for user"
  - **Solution**: Check your MySQL username and password in the DATABASE_URL

- **Error**: "Unknown database 'school_chatbot'"
  - **Solution**: Create the database using `CREATE DATABASE school_chatbot;` in MySQL

### OpenAI API Error
- **Error**: "Missing credentials"
  - **Solution**: Add your OpenAI API key to `.env` file

### Port Already in Use
- **Error**: "Port 5000 is already in use"
  - **Solution**: Change PORT in `.env` file to another port (e.g., 3000)

## Alternative: Using PlanetScale or Railway (Cloud MySQL)

If you don't want to install MySQL locally, you can use cloud MySQL:

### PlanetScale (Recommended)
1. Sign up at https://planetscale.com (free tier available)
2. Create a new database
3. Copy the connection string
4. Update your `.env` file:
   ```env
   DATABASE_URL=your-planetscale-connection-string
   ```

### Railway
1. Sign up at https://railway.app
2. Create a MySQL database
3. Copy the connection string from the dashboard

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
- Your MySQL service is running
- Your `.env` file has all required variables
- You ran `npm install` to install dependencies
- You ran `npm run build` before using `npm start`
