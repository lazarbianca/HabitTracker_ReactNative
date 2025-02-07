import { Category } from "./categoryEnum";
import uuid from "react-native-uuid";

class Habit {
  habitID: string;
  title: string;
  description?: string;
  category: Category;
  startDate: string;
  goal: number | "forever";
  completionData: string[];

  constructor({
    habitID = uuid.v4(),
    title,
    description = null,
    category,
    startDate = new Date().toISOString().split("T")[0],
    goal = "forever", // default to "forever"
    completionData = [],
  }: {
    habitID?: string;
    title: string;
    description?: string | null;
    category: Category;
    startDate?: string;
    goal?: number | "forever";
    completionData?: string[];
  }) {
    this.habitID = habitID;
    this.title = title;
    this.description = description || "";
    this.category = category;
    this.startDate = startDate;
    this.goal = goal ?? "forever";
    this.completionData = completionData;
  }

  complete(date: string): void {
    if (!this.completionData.includes(date)) {
      this.completionData.push(date);
    }
  }

  isCompleted(date: string): boolean {
    return this.completionData.includes(date);
  }
}

export default Habit;
