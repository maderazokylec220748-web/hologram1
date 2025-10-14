import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithAI } from "./openai";
import { insertChatMessageSchema, insertAdminSettingsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language = 'english' } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get conversation history
      const history = await storage.getChatHistory();
      const conversationHistory = history.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Store user message
      await storage.createChatMessage({
        role: "user",
        content: message
      });

      // Get AI response
      const { content, isSchoolRelated } = await chatWithAI(message, conversationHistory, language);

      // Store assistant message
      const assistantMessage = await storage.createChatMessage({
        role: "assistant",
        content
      });

      res.json({
        message: assistantMessage,
        isSchoolRelated
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.get("/api/chat/history", async (req, res) => {
    try {
      const history = await storage.getChatHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  app.post("/api/chat/reset", async (req, res) => {
    try {
      // In a real app, you'd clear the session or user-specific history
      // For now, we'll just return success
      res.json({ success: true });
    } catch (error) {
      console.error("Error resetting chat:", error);
      res.status(500).json({ error: "Failed to reset chat" });
    }
  });

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // Admin routes
  app.get("/api/admin/settings", async (req, res) => {
    try {
      const settings = await storage.getAdminSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching admin settings:", error);
      res.status(500).json({ error: "Failed to fetch admin settings" });
    }
  });

  app.put("/api/admin/settings", async (req, res) => {
    try {
      const validatedData = insertAdminSettingsSchema.parse(req.body);
      const updatedSettings = await storage.updateAdminSettings(validatedData);
      res.json(updatedSettings);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating admin settings:", error);
      res.status(500).json({ error: "Failed to update admin settings" });
    }
  });

  app.get("/api/admin/analytics", async (req, res) => {
    try {
      const analytics = await storage.getChatAnalytics();
      const history = await storage.getChatHistory();
      res.json({
        ...analytics,
        recentMessages: history.slice(-10)
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
