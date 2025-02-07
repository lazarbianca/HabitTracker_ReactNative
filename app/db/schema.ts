import { sqliteTable, text, foreignKey } from "drizzle-orm/sqlite-core";

export const habits = sqliteTable("habits", {
  habitId: text("habitID").primaryKey(), // UUID as text
  title: text("title").notNull(), // Required title
  description: text("description"), // Optional description
  category: text("category").notNull(), // Required category
  startDate: text("startDate").notNull(), // ISO date string
  goal: text("goal").notNull(), // "forever" or numeric as string
});

export const habitCompletions = sqliteTable("habitCompletions", {
  completionId: text("completionId").primaryKey(),
  habitId: text("habitID")
    .notNull()
    .references(() => habits.habitId), // Foreign key to habits
  completedDate: text("completedDate").notNull(), // ISO date string for completion date
});
