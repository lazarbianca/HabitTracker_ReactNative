import { useState } from "react";
import { Calendar } from "react-native-calendars";

interface DateObject {
  dateString: string; // "YYYY-MM-DD"
  day: number; // Day of the month (1-31)
  month: number; // Month of the year (1-12)
  year: number; // Full year (e.g., 2024)
  timestamp: number; // Unix timestamp in milliseconds
}
interface CalendarViewProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const CalendarView = ({ selectedDate, onDateChange }: CalendarViewProps) => {
  return (
    <Calendar
      onDayPress={(day: DateObject) => {
        onDateChange(day.dateString); // Notify parent about the new date
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: "gray",
        },
      }}
      theme={{
        todayTextColor: "red",
        selectedDayBackgroundColor: "gray",
        selectedDayTextColor: "white",
        arrowColor: "blue",
      }}
    />
  );
};

export default CalendarView;
