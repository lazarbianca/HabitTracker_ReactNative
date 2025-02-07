import React from "react";
import Habit from "../model/habit";
import { Card } from "@rneui/themed";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Link } from "expo-router";

interface HabitCardProps {
  habit: Habit;
  onDelete: (habit: Habit) => void;
}

const HabitCard = ({ habit, onDelete }: HabitCardProps) => {
  return (
    <View>
      <Card>
        <View style={styles.cardHeader}>
          <Card.Title>{habit.title}</Card.Title>
          {/* <Card.FeaturedSubtitle>{habit.description}</Card.FeaturedSubtitle> */}
          {/* <Text>{habit.description}</Text> */}
          <View style={styles.iconContainer}>
            <Link href={`/update/${habit.habitID}`} asChild>
              <Icon name="edit" size={24} color="gray" />
            </Link>
            <Pressable onPress={() => onDelete(habit)}>
              <Icon name="delete" size={24} color="gray" />
            </Pressable>
          </View>
        </View>
        <Card.FeaturedTitle>{habit.description || ""}</Card.FeaturedTitle>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(HabitCard);
