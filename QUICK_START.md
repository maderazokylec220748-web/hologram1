# Quick Start Guide for VS Code

## TL;DR - Run with `npm start`

To run this application in Visual Studio Code using `npm start`, follow these steps:

### 1. Install MySQL
Download and install MySQL: https://dev.mysql.com/downloads/mysql/

### 2. Create Database
```bash
# Open MySQL terminal
mysql -u root -p

# Create database
CREATE DATABASE school_chatbot;
exit;
```

### 3. Set Up Environment File
```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and update:
```env
DATABASE_URL=mysql://root:YOUR_PASSWORD@localhost:3306/school_chatbot
OPENAI_API_KEY=sk-your-actual-openai-key
SESSION_SECRET=any-random-secret-string
```

### 4. Install & Setup
```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Build the application
npm run build
```

### 5. Run the Application
```bash
npm start
```

Visit: **http://localhost:5000**

---

## Alternative: Development Mode (Hot Reload)

Instead of `npm start`, you can use development mode which auto-reloads on changes:

```bash
npm run dev
```

---

## Troubleshooting

### "DATABASE_URL is not set"
- Create `.env` file from `.env.example`
- Add your database connection string

### "Unknown database 'school_chatbot'"
- Run: `mysql -u root -p -e "CREATE DATABASE school_chatbot;"`

### "OpenAIError: Missing credentials"
- Add your OpenAI API key to `.env` file
- Get key from: https://platform.openai.com/

### "Cannot find module './dist/index.js'"
- Run `npm run build` before `npm start`
- The build step is required for production mode

### Port 5000 already in use
- Change `PORT=3000` in your `.env` file
- Or stop the process using port 5000

---

## Database Options

### Option 1: Local MySQL (Recommended for development)
```env
DATABASE_URL=mysql://root:password@localhost:3306/school_chatbot
```

### Option 2: PlanetScale (No local install needed)
1. Sign up at https://planetscale.com
2. Create a database
3. Copy connection string to `.env`

---

## Important Notes

- **`npm start`** runs production mode (faster, no hot reload)
- **`npm run dev`** runs development mode (hot reload enabled)
- Both modes require the `.env` file with DATABASE_URL
- You must run `npm run build` before using `npm start`

For detailed setup instructions, see [VS_CODE_SETUP.md](./VS_CODE_SETUP.md)
