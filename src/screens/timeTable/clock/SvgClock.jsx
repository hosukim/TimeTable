import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text as SvgText } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
import { datas, translateDatas } from "./datas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureCircle from "./GestureCircle";

function SvgClock({ selectedDate }) {
  const [schedules, setSchedules] = useState([]);
  const radius = 135;

  useEffect(() => {
    const onChangeDateHandler = async () => {
      const jsonValue = await AsyncStorage.getItem("data");
      if (jsonValue != null) {
        return [];
      }
      return [];
    };
    onChangeDateHandler().then((res) => {
      setSchedules(res);
    });
  }, [selectedDate]);

  return (
    <View style={[styles.clockBlock]}>
      <PieChart
        style={styles.pieChart}
        outerRadius={radius}
        innerRadius={10}
        data={datas(schedules)}
        padAngle={0.01}
        sort={(a, b) => a.key - b.key}
      >
        <Labels />
      </PieChart>
      <GestureCircle
        schedules={schedules}
        setSchedules={setSchedules}
        radius={radius}
      />
    </View>
  );
}

const Labels = ({ slices, height, width }) => {
  return slices.map((slice, index) => {
    const { labelCentroid, pieCentroid, data } = slice;
    const translates = translateDatas();
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
        translateX={translates[index].x}
        translateY={translates[index].y}
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
    flex: 1,
    display: "flex",
    // height: "50%",
  },
  pieChart: {
    height: "100%",
  },
});

export default SvgClock;
