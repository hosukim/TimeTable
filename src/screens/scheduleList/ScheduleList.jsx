import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format2Words, formatDateToYYYYMMDD } from "@utils/DateUtil";
import Schedule from "./schedule/Schedule";

const ScheduleList = ({ selectedDate }) => {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    setSchedules([]);
    const formatDate = formatDateToYYYYMMDD(selectedDate);
    const getSchedulesBySelectedDate = async () => {
      return await AsyncStorage.getItem(formatDate);
    };
    getSchedulesBySelectedDate().then((jsonValue) => {
      if (jsonValue !== null) {
        const parsedValue = JSON.parse(jsonValue);
        if (parsedValue.length !== 1) {
          parsedValue.sort((a, b) => {
            if (a.scheduleTime[0] > b.scheduleTime[0]) return 1;
            if (a.scheduleTime[0] < b.scheduleTime[0]) return -1;
            return 0;
          });
        }
        Array.isArray(parsedValue) &&
          parsedValue.forEach((schedule) => {
            setSchedules((prev) => [
              ...prev,
              {
                scheduleTime: schedule.scheduleTime,
                values: schedule.values,
              },
            ]);
          });
      } else {
      }
    });
  }, [selectedDate]);

  const formatHHMM = (dateByISOString) => {
    const d = new Date(dateByISOString);
    return `${format2Words(d.getHours())}:${format2Words(d.getMinutes())}`;
  };

  const onDeleteHandler = async (index) => {
    const newSchedules = schedules.filter((_, idx) => idx !== index);
    setSchedules((prev) => prev.filter((_, idx) => idx !== index));

    const formatDate = formatDateToYYYYMMDD(selectedDate);
    await AsyncStorage.setItem(formatDate, JSON.stringify(newSchedules));
  };

  const onUpdateHandler = (index) => {};

  return (
    <View style={styles.block}>
      {schedules?.length === 0 ? (
        <Text>등록된 스케쥴이 없습니다</Text>
      ) : (
        <FlatList
          data={schedules}
          renderItem={({ item, index }) => {
            const { scheduleTime, values } = item;
            return (
              <Schedule
                title={values.title}
                time={`${formatHHMM(values.startTime)} ~ ${formatHHMM(
                  values.endTime
                )}`}
                onDelete={onDeleteHandler}
                onUpdate={onUpdateHandler}
                index={index}
              />
            );
          }}
          keyExtractor={(_, index) => `listKey_${index}`}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#e7faff",
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
    borderRadius: 5,
  },
  flatList: {
    width: "100%",
  },
});

export default ScheduleList;
