import React, { useState } from "react";
import {
  calcAngleDegrees,
  QUADRANT,
  getRelativePosition,
} from "@utils/MathUtil";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function GestureCircle({ schedules, setSchedules, radius }) {
  const pressIndex = useSharedValue();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // backgroundColor: isPressed.value ? "yellow" : "blue",
      opacity: 0.1,
      backgroundColor: "(0, 0, 0, 0.5)",
    };
  });

  const findPieArea = (touchX, touchY) => {
    const touchedDegree = calcAngleDegrees(touchX, touchY);
    if (touchX >= 0 && touchY >= 0) {
      // 1사분면
      const target = QUADRANT.one.find((item) => item.degree > touchedDegree);
      return !!target ? target.value : 1;
    } else if (touchX < 0 && touchY >= 0) {
      // 2사분면
      const target = QUADRANT.two.find((item) => item.degree > touchedDegree);
      return !!target ? target.value : 19;
    } else if (touchX < 0 && touchY < 0) {
      // 3사분면
      const target = QUADRANT.three.find((item) => item.degree > touchedDegree);
      return !!target ? target.value : 13;
    } else {
      // 4사분면
      const target = QUADRANT.four.find((item) => item.degree > touchedDegree);
      return !!target ? target.value : 7;
    }
  };

  const [pressingArr, setPressingArr] = useState([]);

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      const { x, y } = getRelativePosition(e.x, e.y);
      const areaIndex = findPieArea(x, y);
      pressIndex.value = areaIndex;
      if (!schedules.includes(areaIndex)) {
        setSchedules((prev) => [...prev, areaIndex]);
        setPressingArr((prev) => [...prev, areaIndex]);
      }
    })
    .onChange((e) => {
      const { x, y } = getRelativePosition(e.x, e.y);
      const areaIndex = findPieArea(x, y);

      // 앞으로 갔다가 뒤로 가는 경우.
      if (pressIndex.value <= areaIndex) {
        const isFrontBack = pressingArr.find((val) => val > areaIndex);
        if (isFrontBack) {
          setSchedules((prev) => prev.filter((val) => val !== isFrontBack));
        }
      }

      // 뒤로 갔다가 앞으로 오는 경우
      //   if (pressIndex.value >= areaIndex) {
      //     const isBackFront = pressingArr.find((val) => val < areaIndex);
      //     if (isBackFront) {
      //       setSchedules((prev) => prev.filter((val) => val !== isBackFront));
      //     }
      //   }

      if (!schedules.includes(areaIndex)) {
        setSchedules((prev) => [...prev, areaIndex]);
        setPressingArr((prev) => [...prev, areaIndex]);
      }
    })
    .onFinalize(() => {
      pressingArr.length !== 0 && setPressingArr([]);
      pressIndex.value = null;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles(radius).gestureCircle, animatedStyles]} />
    </GestureDetector>
  );
}

const styles = (radius) =>
  StyleSheet.create({
    gestureCircle: {
      position: "absolute",
      top: 100, // 이거 문제 있을듯
      textAlign: "center",
      width: radius * 2,
      height: radius * 2,
      borderRadius: 100,
      backgroundColor: "(0, 0, 0, 0.5)",
      alignSelf: "center",
      justifyContent: "center",
    },
  });

export default GestureCircle;
