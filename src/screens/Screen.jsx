import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SubmitForm from "./form/SubmitForm";
import Tab from "./tab/Tab";
import TimeTable from "./timeTable/TimeTable";

const Screen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeArray, setSeletedTimeArray] = useState([]);

  const clearTimeArray = useCallback(() => {
    setSeletedTimeArray([]);
  }, [selectedTimeArray]);

  useEffect(() => {
    clearTimeArray();
  }, [selectedDate]);

  return (
    <View style={styles.wrap}>
      <Tab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeTable
        selectedDate={selectedDate}
        setSeletedTimeArray={setSeletedTimeArray}
      />
      {selectedTimeArray.length !== 0 ? (
        <SubmitForm
          selectedDate={selectedDate}
          selectedTimeArray={selectedTimeArray}
          clearTimeArray={clearTimeArray}
        />
      ) : (
        <View style={styles.tempView}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  tempView: {
    flex: 1,
    paddingBottom: 10,
  },
});

export default Screen;
