import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SvgClock from "./clock/SvgClock";

function TimeTable({ selectedDate, selectedTimeArray, setSelectedTimeArray }) {
  return (
    <GestureHandlerRootView style={styles.block}>
      {/* <Clock /> */}
      <SvgClock
        selectedDate={selectedDate}
        selectedTimeArray={selectedTimeArray}
        setSelectedTimeArray={setSelectedTimeArray}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1.618,
  },
});

export default TimeTable;
