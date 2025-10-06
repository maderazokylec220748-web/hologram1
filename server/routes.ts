import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithAI } from "./openai";
import { insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
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
      const { content, isSchoolRelated } = await chatWithAI(message, conversationHistory);

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

  const httpServer = createServer(app);

  return httpServer;
}
