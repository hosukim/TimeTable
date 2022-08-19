import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ControllButtons from "./buttons/ControllButtons";
import InputForm from "./inputForm/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToYYYYMMDD } from "@utils/DateUtil";

function SubmitForm({ selectedDate, selectedTimeArray, clearTimeArray }) {
  const [values, setValues] = useState({
    title: null,
    startTime: null,
    endTime: null,
    memo: null,
  });
  const onSubmit = async () => {
    const formatDate = formatDateToYYYYMMDD(selectedDate);
    try {
      checkStorageIncludesScheduleByDate()
        .then(async (flag) => {
          const jsonValue = flag ? await AsyncStorage.getItem(formatDate) : {};
          return flag ? JSON.parse(jsonValue) : [];
        })
        .then(async (schedules) => {
          // schedules : [{ scheduleTime: <Int[]>, values: <values[]> }]
          schedules.push({ scheduleTime: selectedTimeArray, values: values });
          await AsyncStorage.setItem(formatDate, JSON.stringify(schedules));
        })
        .then(() => {
          clearTimeArray();
          clearValues();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const clearValues = useCallback(() => {
    setValues({
      title: null,
      startTime: null,
      endTime: null,
      memo: null,
    });
  }, [values]);

  const checkStorageIncludesScheduleByDate = async (formatDate) => {
    let keys = await AsyncStorage.getAllKeys();
    return keys.includes(formatDate);
  };

  return (
    <View style={stlyes.block}>
      <ControllButtons onSubmit={onSubmit} />
      <InputForm setValues={setValues} />
    </View>
  );
}

const stlyes = StyleSheet.create({
  block: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: "yellow",
  },
});

export default SubmitForm;
