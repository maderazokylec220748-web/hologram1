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
      const { content, isSchoolRelated } = await chatWithAI(message, conversationHistory, language, storage);

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

  // School Data Routes
  app.get("/api/professors", async (req, res) => {
    try {
      const professors = await storage.getAllProfessors();
      res.json(professors);
    } catch (error) {
      console.error("Error fetching professors:", error);
      res.status(500).json({ error: "Failed to fetch professors" });
    }
  });

  app.post("/api/professors", async (req, res) => {
    try {
      const professor = await storage.createProfessor(req.body);
      res.json(professor);
    } catch (error) {
      console.error("Error creating professor:", error);
      res.status(500).json({ error: "Failed to create professor" });
    }
  });

  app.get("/api/events", async (req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const event = await storage.createEvent(req.body);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  });

  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({ error: "Failed to fetch departments" });
    }
  });

  app.post("/api/departments", async (req, res) => {
    try {
      const department = await storage.createDepartment(req.body);
      res.json(department);
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ error: "Failed to create department" });
    }
  });

  app.get("/api/facilities", async (req, res) => {
    try {
      const facilities = await storage.getAllFacilities();
      res.json(facilities);
    } catch (error) {
      console.error("Error fetching facilities:", error);
      res.status(500).json({ error: "Failed to fetch facilities" });
    }
  });

  app.post("/api/facilities", async (req, res) => {
    try {
      const facility = await storage.createFacility(req.body);
      res.json(facility);
    } catch (error) {
      console.error("Error creating facility:", error);
      res.status(500).json({ error: "Failed to create facility" });
    }
  });

  app.get("/api/faqs", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const faqs = await storage.getTopFAQs(limit);
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
