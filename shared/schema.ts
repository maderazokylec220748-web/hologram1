import { sql } from "drizzle-orm";
import { mysqlTable, text, varchar, timestamp, int } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const chatMessages = mysqlTable("chat_messages", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  role: text("role").notNull(),
  content: text("content").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  timestamp: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export const adminSettings = mysqlTable("admin_settings", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  schoolName: text("school_name").notNull(),
  schoolMotto: text("school_motto").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  address: text("address").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAdminSettingsSchema = createInsertSchema(adminSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertAdminSettings = z.infer<typeof insertAdminSettingsSchema>;
export type AdminSettings = typeof adminSettings.$inferSelect;

export const professors = mysqlTable("professors", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  department: text("department").notNull(),
  position: text("position").notNull(),
  email: text("email"),
  office: text("office"),
  specialization: text("specialization"),
});

export const insertProfessorSchema = createInsertSchema(professors).omit({
  id: true,
});

export type InsertProfessor = z.infer<typeof insertProfessorSchema>;
export type Professor = typeof professors.$inferSelect;

export const events = mysqlTable("events", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: text("location"),
  category: text("category").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export const departments = mysqlTable("departments", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  building: text("building"),
  contactPerson: text("contact_person"),
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
});

export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Department = typeof departments.$inferSelect;

export const facilities = mysqlTable("facilities", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  capacity: text("capacity"),
  availability: text("availability"),
  description: text("description"),
});

export const insertFacilitySchema = createInsertSchema(facilities).omit({
  id: true,
});

export type InsertFacility = z.infer<typeof insertFacilitySchema>;
export type Facility = typeof facilities.$inferSelect;

export const faqs = mysqlTable("faqs", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
  question: text("question").notNull().unique(),
  normalizedQuestion: text("normalized_question").notNull(),
  count: int("count").notNull().default(1),
  lastAsked: timestamp("last_asked").defaultNow().notNull(),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  lastAsked: true,
});

export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;
