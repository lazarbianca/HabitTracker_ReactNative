import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, StatusBar } from "react-native";
import Habit from "./model/habit";
import { habitService } from "./services/service";
import HabitsList from "./components/HabitList";
import CalendarView from "./components/CalendarView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import { Link } from "expo-router";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [activeHabits, setActiveHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const fetchHabits = async () => {
      const habits = await habitService.getActiveHabits(selectedDate);
      console.log("In index.tsx we have: \n");
      console.log(habits);
      setActiveHabits(habits);
    };

    fetchHabits();
    // Subscribe to updates from HabitService
    const handleUpdate = () => {
      fetchHabits(); // Fetch new habits when repository updates
    };
    habitService.subscribeToHabits(handleUpdate);

    // Cleanup on unmount
    return () => {
      habitService.unsubscribeFromHabits(handleUpdate);
    };
  }, [selectedDate]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CalendarView
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <HabitsList habits={activeHabits} />
        <View style={styles.iconContainer}>
          <Link href="/add" asChild>
            <Pressable>
              <View>
                <Icon
                  reverse
                  name="add"
                  type="material-icons"
                  color="#517fa4"
                />
              </View>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: { position: "absolute", bottom: 20, right: 20, zIndex: 1 },
});
export default App;
