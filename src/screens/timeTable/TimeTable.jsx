import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./clock/Clock";

function TimeTable() {
  return <View style={styles.block}>{/* <Clock /> */}</View>;
}

const styles = StyleSheet.create({
  block: {
    flex: 1.618,
  },
});

export default TimeTable;
