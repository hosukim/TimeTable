import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ControllButtons from "./buttons/ControllButtons";
import InputForm from "./inputForm/InputForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateToYYYYMMDD } from "@utils/DateUtil";

function SubmitForm({ selectedDate, selectedTimeArray }) {
  const [values, setValues] = useState({
    title: null,
    startDate: null,
    endDate: null,
    memo: null,
  });
  const onSubmit = async () => {
    const formatDate = formatDateToYYYYMMDD(selectedDate);

    try {
      checkStorageIncludesHistory()
        .then(async (flag) => {
          const jsonValue = flag ? await AsyncStorage.getItem(formatDate) : {};
          return flag ? JSON.parse(jsonValue) : [];
        })
        .then(async (array) => {
          array.push(values);
          const datas = {
            scheduleTime: selectedTimeArray,
            values: array,
          };
          await AsyncStorage.setItem(formatDate, JSON.stringify(datas));
        });
    } catch (error) {
      console.error(error);
    }
  };

  const checkStorageIncludesHistory = async (formatDate) => {
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
