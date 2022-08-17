import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const DateButton = ({ text, onPressHandler }) => {
  return (
    <TouchableOpacity onPress={onPressHandler} style={styles.noSchedule}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noSchedule: {
    width: 35,
    height: 35,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#f8f9fa",
    borderColor: "black",
    borderWidth: 1,
  },
});

export default DateButton;
