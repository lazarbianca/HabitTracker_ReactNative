// /app/update/[id].tsx
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { habitService } from "../services/service";
import HabitForm from "../components/HabitForm";
import { useRouter } from "expo-router";
import Habit from "../model/habit";
import { Alert, View, Text } from "react-native";

const UpdateHabit: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Grab the dynamic `id` from the URL
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);

  useEffect(() => {
    if (id) {
      const habitId = typeof id === "string" ? id : id[0];
      const habit = habitService.findHabitByID(habitId);
      if (habit) {
        setHabitToEdit(habit); // Set the habit data to the state
      }
    }
  }, [id]); // Re-run this when the `id` changes (e.g., navigating to another habit)

  const handleSave = async (updatedHabit: Habit) => {
    try {
      await habitService.updateHabit(updatedHabit); // Update the habit data
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    }
    Alert.alert("Success", "Habit updated successfully!");
    router.back(); // Go back to the previous screen
  };

  if (!habitToEdit) return null; // Wait until habit data is available

  return (
    <View>
      <HabitForm habitToEdit={habitToEdit} onSave={handleSave} />
    </View>
  );
};

export default UpdateHabit;
