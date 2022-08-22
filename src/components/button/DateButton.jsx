import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const DateButton = ({ text, onPressHandler, noScheduleFlag }) => {
  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={styles(noScheduleFlag).schedule}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = (noSchedule) =>
  StyleSheet.create({
    schedule: {
      width: 35,
      height: 35,
      marginTop: 5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      backgroundColor: noSchedule ? "#f8f9fa" : "#009900",
      borderColor: "#333",
      borderWidth: 1,
    },
  });

export default DateButton;
