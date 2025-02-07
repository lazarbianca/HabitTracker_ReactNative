import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Habit from "../model/habit";
import HabitCard from "./HabitCard";
import { habitService } from "../services/service";

interface HabitListProps {
  habits: Habit[];
}

const HabitsList = ({ habits }: HabitListProps) => {
  if (habits.length === 0) {
    return <Text>No active habits for this day.</Text>;
  }

  const handleDelete = (habit: Habit) => {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          console.log(`Deleting habit: ${habit.title}`);
          try {
            await habitService.removeHabit(habit.habitID);
          } catch (error: unknown) {
            if (error instanceof Error) {
              Alert.alert("Error", error.message);
            } else {
              Alert.alert("Error", "An unknown error occurred");
            }
          }
          Alert.alert("Success", "Habit deleted successfully!");
        },
      },
    ]);
  };

  return (
    <FlatList
      data={habits}
      renderItem={({ item }) => (
        <HabitCard habit={item} onDelete={handleDelete} />
      )}
      keyExtractor={(item) => item.habitID}
    />
  );
};

export default HabitsList;
