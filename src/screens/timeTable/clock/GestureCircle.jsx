import React, { useEffect, useState } from "react";
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

function GestureCircle({
  schedules,
  setSchedules,
  radius,
  selectedTimeArray,
  setSelectedTimeArray,
}) {
  const [pressingArr, setPressingArr] = useState([]);
  const pressIndex = useSharedValue();
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: 0.1,
      backgroundColor: "(0, 0, 0, 0.5)",
    };
  });

  useEffect(() => {
    selectedTimeArray.length === 0 &&
      setSchedules((prev) =>
        prev.filter((_, index) => index !== schedules.length - 1)
      );
  }, [selectedTimeArray]);

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

  const gesture = Gesture.Pan()
    .minDistance(10)
    .onBegin((e) => {
      if (selectedTimeArray.length !== 0) {
        setSelectedTimeArray([]);
      }
      // const { x, y } = getRelativePosition(e.x, e.y);
      const x = e.x - radius;
      const y = e.y < radius ? Math.abs(radius - e.y) : radius - e.y;
      console.log("x : " + x + " || y : " + y);

      const areaIndex = findPieArea(x, y);
      console.log("areaIndex : " + areaIndex);
      pressIndex.value = areaIndex;

      setPressingArr((prev) => [...prev, areaIndex]);
    })
    .onChange((e) => {
      const { x, y } = getRelativePosition(e.x, e.y);
      const areaIndex = findPieArea(x, y);
      // 앞으로 갔다가 뒤로 가는 경우.
      if (pressIndex.value <= areaIndex) {
        const isFrontBack = pressingArr.find((val) => val > areaIndex);
        if (isFrontBack) {
          setPressingArr((prev) => prev.filter((val) => val !== isFrontBack));
        }
      }

      if (!pressingArr.includes(areaIndex)) {
        setPressingArr((prev) => [...prev, areaIndex]);
      }
    })
    .onFinalize(() => {
      const newPressingArr = Array.from(new Set(pressingArr));
      setSelectedTimeArray(newPressingArr);
      setSchedules((prev) => [...prev, newPressingArr]);
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
