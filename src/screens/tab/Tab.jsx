import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dates from "@screens/tab/dates/Dates";
import { useMemo, useState } from "react";
import { formatDateToYYYYMMDD, getOneWeekByDate, WEEK } from "@utils/DateUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = ({ selectedDate, setSelectedDate }) => {
  const [tempDateForRender, setTempDateForRender] = useState(new Date());
  const renderedWeek = useMemo(() => {
    return getOneWeekByDate(tempDateForRender);
  }, [tempDateForRender]);

  useEffect(() => {
    const formatDate = formatDateToYYYYMMDD(selectedDate);
    const getSchedulesBySelectedDate = async () => {
      console.log(formatDate);
      return await AsyncStorage.getItem(formatDate);
    };
    getSchedulesBySelectedDate()
      .then((jsonValue) => {
        if (jsonValue !== null) {
          console.log("-----------");
          console.log(jsonValue);
        } else {
          console.log("-----------");
          console.log(jsonValue);
        }
      })
      .catch((error) => {
        console.log("--error--");
        console.log(error);
      });
  }, [selectedDate]);

  const onPressDateButton = (index) => {
    setSelectedDate(renderedWeek[index]);
  };

  const onPressPrevButton = () => {
    setTempDateForRender(
      new Date(tempDateForRender.setDate(tempDateForRender.getDate() - WEEK))
    );
  };

  const onPressNextButton = () => {
    setTempDateForRender(
      new Date(tempDateForRender.setDate(tempDateForRender.getDate() + WEEK))
    );
  };

  return (
    <View style={styles.block}>
      <AntDesign name="left" size={20} onPress={onPressPrevButton} />
      <Dates
        selectedDate={selectedDate}
        renderedWeek={renderedWeek}
        onPressDateButton={onPressDateButton}
      />
      <AntDesign name="right" size={20} onPress={onPressNextButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
});

export default Tab;
