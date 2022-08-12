import { useState, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DAYS } from "__fixture__/Date";
import DateButton from "@components/button/DateButton";
import { getDayNameByIndex, getOneWeekByDate } from "@utils/DateUtil";

const Dates = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [renderedWeekArr, setRenderedWeekArr] = useState();

  const renderedWeek = useMemo(() => {
    return getOneWeekByDate(selectedDate);
  }, [selectedDate]);
  const onPressDateButton = (index) => {
    setSelectedDate(renderedWeek[index]);
  };

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
                onPressHandler={() => {
                  onPressDateButton(index);
                }}
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
      backgroundColor: isToday ? "skyblue" : "transparent",
      borderRadius: 5,
    },
  });

export default Dates;
