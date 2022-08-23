import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ControllButtons from "./buttons/ControllButtons";
import InputForm from "./inputForm/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToYYYYMMDD } from "@utils/DateUtil";
import { checkStorageIncludesScheduleByDate } from "@utils/StorageUtil";

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
      checkStorageIncludesScheduleByDate(formatDate)
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

  return (
    <View style={stlyes.block}>
      <ControllButtons onSubmit={onSubmit} />
      <InputForm setValues={setValues} selectedTimeArray={selectedTimeArray} />
    </View>
  );
}

const stlyes = StyleSheet.create({
  block: {
    flex: 1,
    // height: "100%",
    paddingBottom: 10,
    backgroundColor: "yellow",
    justifyContent: "flex-end",
  },
});

export default SubmitForm;
