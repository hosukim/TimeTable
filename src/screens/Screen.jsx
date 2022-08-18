import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SubmitForm from "./form/SubmitForm";
import Tab from "./tab/Tab";
import TimeTable from "./timeTable/TimeTable";

const Screen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeArray, setSeletedTimeArray] = useState([]);
  return (
    <View style={styles.wrap}>
      <Tab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeTable
        selectedDate={selectedDate}
        setSeletedTimeArray={setSeletedTimeArray}
      />
      <SubmitForm
        selectedDate={selectedDate}
        selectedTimeArray={selectedTimeArray}
      />
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
});

export default Screen;
