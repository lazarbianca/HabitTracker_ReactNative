import React from "react";
import { useRouter } from "expo-router";
import HabitForm from "./components/HabitForm";
import { habitService } from "./services/service";
import Habit from "./model/habit";
import { Alert } from "react-native";

const AddHabit: React.FC = () => {
  const router = useRouter();

  const handleSave = async (newHabit: Habit) => {
    console.log(newHabit);
    try {
      await habitService.addHabit(newHabit);
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    }
    Alert.alert("Success", "Habit created successfully!");
    router.back();
  };

  return <HabitForm onSave={handleSave} />;
};

export default AddHabit;
