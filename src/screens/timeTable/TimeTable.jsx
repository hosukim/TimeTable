import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SvgClock from "./clock/SvgClock";

function TimeTable({ selectedDate, selectedTimeArray, setSelectedTimeArray }) {
  return (
    <View style={styles.block}>
      {/* <Clock /> */}
      <SvgClock
        selectedDate={selectedDate}
        selectedTimeArray={selectedTimeArray}
        setSelectedTimeArray={setSelectedTimeArray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1.618,
  },
});

export default TimeTable;
