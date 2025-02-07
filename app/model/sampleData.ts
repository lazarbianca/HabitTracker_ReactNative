import { Category } from "./categoryEnum";
import Habit from "./habit";

export const sampleHabits = [
  new Habit({
    title: "Quit Smoking",
    category: Category.QUIT_BAD_HABIT,
    startDate: "2024-11-27",
    goal: "forever", // Goal is forever
    description: "",
    completionData: [],
  }),
  new Habit({
    title: "Practice React Native",
    category: Category.ACADEMIC,
    startDate: "2024-11-27",
    goal: 365, // Goal of 365 days
    description: "See study plan on Discord",
    completionData: [],
  }),
  new Habit({
    title: "Exercise Daily",
    category: Category.HEALTH,
    startDate: "2024-11-01",
    goal: 30, // Goal of 30 days
    description: "Morning jog or gym session",
    completionData: [],
  }),
  new Habit({
    title: "Read Books",
    category: Category.SELF,
    startDate: "2024-11-15",
    goal: 50, // Goal of 50 days
    description: "Read one chapter daily",
    completionData: [],
  }),
  new Habit({
    title: "Meditate",
    category: Category.SELF,
    startDate: "2024-11-20",
    goal: 60, // Goal of 60 days
    description: "Daily meditation session",
    completionData: [],
  }),
  new Habit({
    title: "Visit Grandparents",
    category: Category.SOCIAL,
    startDate: "2024-12-01",
    goal: 90, // Goal of 90 days
    description: "Bring them a nice gift",
    completionData: [],
  }),
  new Habit({
    title: "Save More Money",
    category: Category.FINANCE,
    startDate: "2024-11-27",
    goal: 365, // Goal of 365 days
    description: "Save at least $80 daily",
    completionData: [],
  }),
];
