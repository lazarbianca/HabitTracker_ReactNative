import Habit from "./habit";
import { db } from "../db/database"; // Your Drizzle + SQLite instance
import { habits as habitsTable, habitCompletions } from "../db/schema";
import { eq } from "drizzle-orm";

type Subscriber = () => void;

export class HabitRepository {
  private habits: Habit[] = [];
  private subscribers: Subscriber[] = [];

  constructor() {
    this.habits = []; // Start with an empty array
    this.subscribers = [];
    this.initialize(); // Fetch habits from the database on startup
  }

  async initialize(): Promise<void> {
    try {
      console.log("localDbRepo initialize");
      const fetchedHabits = await db.select().from(habitsTable);
      this.habits = fetchedHabits.map((habit) => ({
        habitID: habit.habitId,
        title: habit.title,
        description: habit.description,
        category: habit.category,
        startDate: habit.startDate,
        goal: habit.goal,
      }));
      console.log(this.habits);
      this.notifySubscribers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to initialize habits from DB:", error.message);
        throw new Error("Failed to load habits.");
      } else {
        throw new Error("An unknown error has occurred");
      }
    }
  }

  async addHabit(habit: Habit): Promise<void> {
    try {
      await db.insert(habitsTable).values({
        habitId: habit.habitID,
        title: habit.title,
        description: habit.description,
        category: habit.category,
        startDate: habit.startDate,
        goal:
          typeof habit.goal === "number" ? habit.goal.toString() : habit.goal,
      });
      this.habits.push(habit);
      this.notifySubscribers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add habit:", error.message);
        throw new Error("Failed to add habit.");
      } else {
        throw new Error("An unknown error has occurred");
      }
    }
  }

  async removeHabit(habitID: string): Promise<void> {
    try {
      await db.delete(habitsTable).where(eq(habitsTable.habitId, habitID));
      this.habits = this.habits.filter((habit) => habit.habitID !== habitID);
      this.notifySubscribers();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to remove habit:", error.message);
        throw new Error("Failed to remove habit.");
      } else {
        throw new Error("An unknown error has occurred");
      }
    }
  }

  async updateHabit(updatedHabit: Habit): Promise<void> {
    try {
      await db
        .update(habitsTable)
        .set({
          title: updatedHabit.title,
          description: updatedHabit.description,
          category: updatedHabit.category,
          startDate: updatedHabit.startDate,
          goal: updatedHabit.goal,
        })
        .where(eq(habitsTable.habitId, updatedHabit.habitID));
      const index = this.habits.findIndex(
        (habit) => habit.habitID === updatedHabit.habitID
      );
      if (index !== -1) {
        this.habits[index] = updatedHabit;
        this.notifySubscribers();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to update habit:", error.message);
        throw new Error("Failed to update habit.");
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  getAllHabits(): Habit[] {
    return this.habits;
  }

  getHabitByID(habitID: string): Habit | undefined {
    return this.habits.find((habit) => habit.habitID === habitID);
  }

  subscribe(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((subscriber) => subscriber());
  }
}

// Export a singleton instance
export const habitRepository = new HabitRepository();
