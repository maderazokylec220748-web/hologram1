import { type User, type InsertUser, type ChatMessage, type InsertChatMessage, type AdminSettings, type InsertAdminSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(): Promise<ChatMessage[]>;
  getAdminSettings(): Promise<AdminSettings | undefined>;
  updateAdminSettings(settings: InsertAdminSettings): Promise<AdminSettings>;
  getChatAnalytics(): Promise<{ totalMessages: number; userMessages: number; assistantMessages: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: ChatMessage[];
  private adminSettings: AdminSettings | undefined;

  constructor() {
    this.users = new Map();
    this.chatMessages = [];
    this.adminSettings = {
      id: randomUUID(),
      schoolName: "Westmead International School",
      schoolMotto: "Learning Beyond Borders",
      contactEmail: "iwestmead@gmail.com",
      contactPhone: "+63 908 655 5521",
      address: "Comet St., Golden Country Homes Subdivision, Alangilan, Batangas City, Philippines",
      updatedAt: new Date(),
    };
    
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "KYLED1P",
      password: "kyle",
    };
    this.users.set(adminId, adminUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: randomUUID(),
      ...insertMessage,
      timestamp: new Date(),
    };
    this.chatMessages.push(message);
    return message;
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    return this.chatMessages.slice(-20);
  }

  async getAdminSettings(): Promise<AdminSettings | undefined> {
    return this.adminSettings;
  }

  async updateAdminSettings(insertSettings: InsertAdminSettings): Promise<AdminSettings> {
    this.adminSettings = {
      id: this.adminSettings?.id || randomUUID(),
      ...insertSettings,
      updatedAt: new Date(),
    };
    return this.adminSettings;
  }

  async getChatAnalytics(): Promise<{ totalMessages: number; userMessages: number; assistantMessages: number }> {
    const totalMessages = this.chatMessages.length;
    const userMessages = this.chatMessages.filter(msg => msg.role === 'user').length;
    const assistantMessages = this.chatMessages.filter(msg => msg.role === 'assistant').length;
    return { totalMessages, userMessages, assistantMessages };
  }
}

export const storage = new MemStorage();
