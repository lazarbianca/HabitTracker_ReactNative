import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { db } from "./database";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { habits as habitsTable } from "../db/schema";
import { sampleHabits } from "../model/sampleData";

interface MigrationHandlerProps {
  onMigrationComplete?: () => void;
}

const MigrationHandler: React.FC<MigrationHandlerProps> = ({
  onMigrationComplete,
}) => {
  const { success, error } = useMigrations(db, migrations); // Run migrations

  useEffect(() => {
    if (!success) return;

    (async () => {
      try {
        // Check if the habits table already has data
        const existingHabits = await db.select().from(habitsTable);

        if (existingHabits.length === 0) {
          // Insert sample habits into the database if table is empty
          for (const habit of sampleHabits) {
            await db.insert(habitsTable).values({
              habitId: habit.habitID, // Ensure to have habitID for each habit
              title: habit.title,
              description: habit.description,
              category: habit.category,
              startDate: habit.startDate,
              goal: habit.goal,
            });
          }

          console.log("Sample habits have been inserted into the database.");
        } else {
          console.log(
            "Habits table already contains data, skipping insertion."
          );
        }

        if (onMigrationComplete) onMigrationComplete();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Database operation error:", err.message);
        } else {
          throw new Error("An unknown error has occurred");
        }
      }
    })();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return null; // No need to display anything in the UI
};

export default MigrationHandler;
