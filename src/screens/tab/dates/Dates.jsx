import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DAYS } from "__fixture__/Date";
import DateButton from "@components/button/DateButton";
import { formatDateToYYYYMMDD, getDayNameByIndex } from "@utils/DateUtil";
import { checkStorageIncludesScheduleByDate } from "@utils/StorageUtil";

const Dates = ({ selectedDate, renderedWeek, onPressDateButton }) => {
  const [scheduleFlagArr, setScheduleFlagArr] = useState([]);

  useEffect(() => {
    const checkSchduleDate = async (date) => {
      const formatDate = formatDateToYYYYMMDD(date);
      const flag = await checkStorageIncludesScheduleByDate(formatDate);
      setScheduleFlagArr((prev) => [...prev, flag]);
    };
    renderedWeek.forEach((date) => {
      checkSchduleDate(date);
    });
    return () => {
      setScheduleFlagArr([]);
    };
  }, [renderedWeek]);

  const checkSelectDate = (date) => {
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  return (
    <View style={styles().wrap}>
      {Array(Object.keys(DAYS).length)
        .fill()
        .map((_, index) => {
          return (
            <TouchableOpacity
              key={`day_${index}`}
              style={styles(checkSelectDate(renderedWeek[index])).block}
              onPress={() => {
                onPressDateButton(index);
              }}
            >
              <Text>{getDayNameByIndex(index)}</Text>
              <DateButton
                text={renderedWeek[index].getDate()}
                onPressHandler={() => onPressDateButton(index)}
                noScheduleFlag={!scheduleFlagArr[index]}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = (isToday) =>
  StyleSheet.create({
    wrap: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    block: {
      width: 40,
      textAlign: "center",
      alignItems: "center",
      paddingVertical: 10,
      backgroundColor: isToday ? "#e7f4ff" : "transparent",
      borderRadius: 5,
    },
  });

export default Dates;
