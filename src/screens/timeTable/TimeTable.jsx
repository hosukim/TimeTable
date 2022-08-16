import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./clock/Clock";
import SvgClock from "./clock/SvgClock";
import {
  PanGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";

function TimeTable() {
  return (
    <PanGestureHandler minDist={1} onGestureEvent={(e) => console.log(e)}>
      <View style={styles.block}>
        {/* <Clock /> */}
        <SvgClock />
      </View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1.618,
  },
});

export default TimeTable;
