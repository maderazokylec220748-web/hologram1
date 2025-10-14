import { 
  type User, type InsertUser, 
  type ChatMessage, type InsertChatMessage, 
  type AdminSettings, type InsertAdminSettings,
  type Professor, type InsertProfessor,
  type Event, type InsertEvent,
  type Department, type InsertDepartment,
  type Facility, type InsertFacility,
  type Faq, type InsertFaq
} from "@shared/schema";
import { db } from "./db";
import * as schema from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(): Promise<ChatMessage[]>;
  getAdminSettings(): Promise<AdminSettings | undefined>;
  updateAdminSettings(settings: InsertAdminSettings): Promise<AdminSettings>;
  getChatAnalytics(): Promise<{ totalMessages: number; userMessages: number; assistantMessages: number }>;
  
  getAllProfessors(): Promise<Professor[]>;
  createProfessor(professor: InsertProfessor): Promise<Professor>;
  
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  
  getAllDepartments(): Promise<Department[]>;
  getDepartmentByCode(code: string): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  
  getAllFacilities(): Promise<Facility[]>;
  createFacility(facility: InsertFacility): Promise<Facility>;
  
  trackFAQ(question: string, normalizedQuestion: string): Promise<Faq>;
  getTopFAQs(limit?: number): Promise<Faq[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const users = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return users[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return users[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(schema.users).values(insertUser).returning();
    return user;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(schema.chatMessages).values(insertMessage).returning();
    return message;
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    return await db.select().from(schema.chatMessages).orderBy(desc(schema.chatMessages.timestamp)).limit(20);
  }

  async getAdminSettings(): Promise<AdminSettings | undefined> {
    const settings = await db.select().from(schema.adminSettings).limit(1);
    return settings[0];
  }

  async updateAdminSettings(insertSettings: InsertAdminSettings): Promise<AdminSettings> {
    const existing = await this.getAdminSettings();
    if (existing) {
      const [updated] = await db
        .update(schema.adminSettings)
        .set({ ...insertSettings, updatedAt: new Date() })
        .where(eq(schema.adminSettings.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(schema.adminSettings).values(insertSettings).returning();
      return created;
    }
  }

  async getChatAnalytics(): Promise<{ totalMessages: number; userMessages: number; assistantMessages: number }> {
    const total = await db.select({ count: sql<number>`count(*)` }).from(schema.chatMessages);
    const userMsgs = await db.select({ count: sql<number>`count(*)` }).from(schema.chatMessages).where(eq(schema.chatMessages.role, 'user'));
    const assistantMsgs = await db.select({ count: sql<number>`count(*)` }).from(schema.chatMessages).where(eq(schema.chatMessages.role, 'assistant'));
    
    return {
      totalMessages: Number(total[0]?.count || 0),
      userMessages: Number(userMsgs[0]?.count || 0),
      assistantMessages: Number(assistantMsgs[0]?.count || 0),
    };
  }

  async getAllProfessors(): Promise<Professor[]> {
    return await db.select().from(schema.professors);
  }

  async createProfessor(professor: InsertProfessor): Promise<Professor> {
    const [newProfessor] = await db.insert(schema.professors).values(professor).returning();
    return newProfessor;
  }

  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(schema.events).orderBy(desc(schema.events.eventDate));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await db.select().from(schema.events).where(sql`${schema.events.eventDate} >= NOW()`).orderBy(schema.events.eventDate);
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(schema.events).values(event).returning();
    return newEvent;
  }

  async getAllDepartments(): Promise<Department[]> {
    return await db.select().from(schema.departments);
  }

  async getDepartmentByCode(code: string): Promise<Department | undefined> {
    const departments = await db.select().from(schema.departments).where(eq(schema.departments.code, code));
    return departments[0];
  }

  async createDepartment(department: InsertDepartment): Promise<Department> {
    const [newDepartment] = await db.insert(schema.departments).values(department).returning();
    return newDepartment;
  }

  async getAllFacilities(): Promise<Facility[]> {
    return await db.select().from(schema.facilities);
  }

  async createFacility(facility: InsertFacility): Promise<Facility> {
    const [newFacility] = await db.insert(schema.facilities).values(facility).returning();
    return newFacility;
  }

  async trackFAQ(question: string, normalizedQuestion: string): Promise<Faq> {
    const existing = await db.select().from(schema.faqs).where(eq(schema.faqs.normalizedQuestion, normalizedQuestion));
    
    if (existing.length > 0) {
      const [updated] = await db
        .update(schema.faqs)
        .set({ 
          count: sql`${schema.faqs.count} + 1`,
          lastAsked: new Date(),
          question
        })
        .where(eq(schema.faqs.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(schema.faqs).values({
        question,
        normalizedQuestion,
        count: 1,
      }).returning();
      return created;
    }
  }

  async getTopFAQs(limit: number = 10): Promise<Faq[]> {
    return await db.select().from(schema.faqs).orderBy(desc(schema.faqs.count)).limit(limit);
  }
}

export const storage = new DatabaseStorage();
