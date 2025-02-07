import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";
import Checkbox from "expo-checkbox";
import CategoryDropdown from "./CategoryDropdown";
import Habit from "../model/habit";
import { Category } from "../model/categoryEnum";
import { habitService } from "../services/service";
import CalendarView from "./CalendarView";

interface HabitFormProps {
  habitToEdit?: Habit; // Optional, only for the Update form
  onSave: (habit: Habit) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ habitToEdit, onSave }) => {
  const [title, setTitle] = useState<string>(habitToEdit?.title || "");
  const [description, setDescription] = useState<string>(
    habitToEdit?.description || ""
  );
  const [category, setCategory] = useState<Category | null>(
    habitToEdit?.category || null
  );
  const [startDate, setStartDate] = useState<string>(
    habitToEdit?.startDate || new Date().toISOString().split("T")[0]
  );
  const [goal, setGoal] = useState<number | "forever">(
    habitToEdit?.goal || "forever"
  );
  const [isForever, setIsForever] = useState<boolean>(
    habitToEdit?.goal === "forever"
  );
  const MAX_GOAL = 99999;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isForever) {
      setGoal("forever");
    }
  }, [isForever]);

  const handleSave = () => {
    if (!title || !category) {
      Alert.alert("Error", "Title and category are required fields!");
      return;
    }

    if (goal !== "forever" && goal > MAX_GOAL) {
      Alert.alert("Error", `Goal cannot exceed ${MAX_GOAL} days.`);
      return;
    }

    const newHabit = new Habit({
      habitID: habitToEdit?.habitID,
      title,
      description,
      category,
      startDate,
      goal,
      completionData: [],
    });
    onSave(newHabit);
  };

  const handleGoalChange = (text: string) => {
    const parsedGoal = parseInt(text);
    if (!isNaN(parsedGoal) && parsedGoal <= MAX_GOAL) {
      setGoal(parsedGoal);
    } else if (isNaN(parsedGoal)) {
      setGoal(0);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter habit title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter habit description (optional)"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Category:</Text>
      <CategoryDropdown value={category} setCategory={setCategory} />

      <Text style={styles.label}>Start Date: {startDate}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.pickDateButton}>Pick Date</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Goal (Days):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter number of days"
        value={goal === "forever" ? "" : String(goal)}
        onChangeText={handleGoalChange}
        keyboardType="numeric"
        editable={!isForever} // Disable when "forever" is checked
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isForever}
          onValueChange={() => setIsForever(!isForever)}
        />
        <Text style={styles.checkboxLabel}>Forever</Text>
      </View>

      <Button title="Save Habit" onPress={handleSave} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CalendarView
              selectedDate={startDate}
              onDateChange={(date) => {
                setStartDate(date);
                setModalVisible(false);
              }}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  pickDateButton: {
    color: "#517fa4",
    fontSize: 16,
    marginVertical: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});

export default HabitForm;
