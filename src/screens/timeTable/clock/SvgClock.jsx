import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { G } from "react-native-svg";
import { Text } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";

function SvgClock() {
  const [arr, setArr] = useState([]);
  const data = [
    {
      key: 1,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 2,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 3,
      value: 10,
      svg: { fill: "#efefef" },
      label: "abc",
    },
    {
      key: 4,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 5,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 6,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 7,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 8,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 9,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 10,
      value: 10,
      svg: { fill: "#efefef" },
    },
    {
      key: 11,
      value: 11,
      svg: { fill: "#efefef" },
    },
    {
      key: 12,
      value: 12,
      onPress: () => {
        setArr((prev) => {
          return [...prev, 12];
        });
      },
      svg: { fill: arr.find((item) => item == 12) ? "#000000" : "#efefef" },
    },
  ];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler minDist={1} onGestureEvent={(e) => console.log(e)}>
        <View style={styles.clockBlock}>
          <PieChart
            style={styles.pieChart}
            outerRadius={"70%"}
            innerRadius={10}
            data={data}
            padAngle={0.01}
            sort={(a, b) => a.key - b.key}
          >
            <Labels />
          </PieChart>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    return (
      <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
        <Text
          key={index}
          x={labelCentroid[0]}
          y={labelCentroid[1]}
          fill={"#333"}
          textAnchor={"middle"}
          alignmentBaseline={"center"}
          fontSize={13}
          stroke={"black"}
          strokeWidth={0.1}
        >
          {data.key}
        </Text>
      </G>
    );
  });
};

const styles = StyleSheet.create({
  clockBlock: {
    // flex: 1,
    height: "50%",
  },
  pieChart: {
    height: "100%",
  },
});

export default SvgClock;
