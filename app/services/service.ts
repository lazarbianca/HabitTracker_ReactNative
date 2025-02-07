import Habit from "../model/habit";
import { habitRepository } from "../model/localDbRepository";

type Subscriber = () => void;

export class HabitService {
  async getActiveHabits(selectedDate: string): Promise<Habit[]> {
    const allHabits = await habitRepository.getAllHabits(); // Updated to await repository's async method
    console.log(`in service: ${allHabits.length}`);
    const selectedDateObj = new Date(selectedDate);

    return allHabits.filter((currentHabit) => {
      const startDate = new Date(currentHabit.startDate);
      const endDate =
        currentHabit.goal === "forever"
          ? null // if the goal is 'forever', there's no end date
          : new Date(
              startDate.getTime() + currentHabit.goal * 24 * 60 * 60 * 1000
            ); // add goal days to startDate

      return (
        selectedDateObj >= startDate && // check if selected date is after/on the start date
        (endDate === null || selectedDateObj <= endDate) // if there's an end date, check if selected date is before/on it
      );
    });
  }

  async completeHabit(habitID: string, date: string): Promise<void> {
    const habit = await habitRepository.getHabitByID(habitID); // Use async repository call
    if (!habit) {
      throw new Error(`Habit with ID ${habitID} not found`);
    }

    // await habitRepository.completeHabit(habitID, date); // Add this to HabitRepository
  }

  async addHabit(habit: Habit): Promise<void> {
    try {
      await habitRepository.addHabit(habit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async updateHabit(updatedHabit: Habit): Promise<void> {
    try {
      await habitRepository.updateHabit(updatedHabit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async removeHabit(habitToRemoveID: string): Promise<void> {
    try {
      await habitRepository.removeHabit(habitToRemoveID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  findHabitByID(habitID: string): Habit | undefined {
    return habitRepository.getHabitByID(habitID);
  }

  subscribeToHabits(callback: Subscriber): void {
    habitRepository.subscribe(callback); // Subscription remains synchronous
  }

  unsubscribeFromHabits(callback: Subscriber): void {
    habitRepository.unsubscribe(callback); // Unsubscription remains synchronous
  }
}

export const habitService = new HabitService();
