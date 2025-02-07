import Habit from "./habit";
import { sampleHabits } from "./sampleData";

type Subscriber = () => void;

export class HabitRepository {
  private habits: Habit[] = [];
  private subscribers: Subscriber[] = [];
  constructor() {
    this.habits = sampleHabits;
    this.subscribers = [];
  }

  addHabit(habit: Habit): void {
    this.habits.push(habit);
    this.notifySubscribers();
  }

  removeHabit(habitID: string): void {
    this.habits = this.habits.filter((habit) => habit.habitID !== habitID);
    this.notifySubscribers();
  }

  updateHabit(updatedHabit: Habit): void {
    const index = this.habits.findIndex(
      (habit) => habit.habitID === updatedHabit.habitID
    );
    if (index !== -1) {
      this.habits[index] = updatedHabit;
      this.notifySubscribers();
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

export const habitRepository = new HabitRepository();
