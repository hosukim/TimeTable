import { calcAngleDegrees, getCoordinate } from "@utils/MathUtil";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Text as SvgText } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
import { datas, degrees } from "./datas";

function GestureCircle({ setArr, radius }) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // transform: [
      //   { translateX: offset.value.x },
      //   { translateY: offset.value.y },
      //   { scale: withSpring(isPressed.value ? 1.2 : 1) },
      // ],
      backgroundColor: isPressed.value ? "yellow" : "blue",
      opacity: 0.1,
      // backgroundColor: "(0, 0, 0, 0.5)",
    };
  });

  const findPieArea = (touchX, touchY) => {
    let index;
    const arr = degrees();
    for (let i = 0; i < 24; i++) {
      const prev = getCoordinate(radius, Math.abs(arr[i].min));
      const next = getCoordinate(radius, Math.abs(arr[i].max));

      if (
        isIncludes(
          calcAngleDegrees(prev.x, prev.y),
          calcAngleDegrees(touchX, touchY),
          calcAngleDegrees(next.x, next.y)
        )
      ) {
        index = i;
        break;
      }
    }
    return index;
  };

  const isIncludes = (alpha, target, beta) => {
    return target > alpha && target < beta;
  };

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      "worklet";
      isPressed.value = true;
      const x = e.x - radius;
      const y = e.y < radius ? Math.abs(radius - e.y) : radius - e.y;
      const index = findPieArea(x, y);
      setArr((prev) => [...prev, index]);
    })
    .onChange((e) => {
      "worklet";
      offset.value = {
        x: e.x,
        y: e.y,
      };
    })
    .onFinalize(() => {
      "worklet";
      isPressed.value = false;
      console.log("out");
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.gestureCircle, animatedStyles]} />
    </GestureDetector>
  );
}

function SvgClock() {
  const [arr, setArr] = useState([]);
  const radius = 135;
  return (
    <View style={[styles.clockBlock]}>
      <PieChart
        style={styles.pieChart}
        outerRadius={radius}
        innerRadius={10}
        data={datas(arr)}
        padAngle={0.01}
        sort={(a, b) => a.key - b.key}
      >
        <Labels />
      </PieChart>
      <GestureCircle setArr={setArr} radius={radius} />
    </View>
  );
}

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    return index % 2 === 1 ? (
      <SvgText
        key={index}
        x={labelCentroid[0] * 2.1}
        y={labelCentroid[1] * 2.1}
        fill={"#333"}
        textAnchor={"middle"}
        alignmentBaseline={"center"}
        fontSize={13}
        stroke={"black"}
        strokeWidth={0.1}
      >
        {data.key}
      </SvgText>
    ) : (
      <SvgText
        key={index}
        x={labelCentroid[0] * 2.1}
        y={labelCentroid[1] * 2.1}
        fill={"#333"}
        textAnchor={"middle"}
        alignmentBaseline={"center"}
        fontSize={13}
        stroke={"black"}
        strokeWidth={0.1}
      ></SvgText>
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
  gestureCircle: {
    position: "absolute",
    top: "15%",
    width: "70%",
    height: "70%",
    borderRadius: 100,
    backgroundColor: "(0, 0, 0, 0.5)",
    alignSelf: "center",
  },
});

export default SvgClock;
