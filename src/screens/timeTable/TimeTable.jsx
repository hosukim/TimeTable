import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./clock/Clock";
import SvgClock from "./clock/SvgClock";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

function TimeTable() {
  return (
    <View style={styles.block}>
      {/* <Clock /> */}
      <SvgClock />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1.618,
  },
});

export default TimeTable;
