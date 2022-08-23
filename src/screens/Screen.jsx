import React, { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SubmitForm from "./form/SubmitForm";
import ScheduleList from "./scheduleList/ScheduleList";
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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "position"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SubmitForm
              selectedDate={selectedDate}
              selectedTimeArray={selectedTimeArray}
              clearTimeArray={clearTimeArray}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <ScheduleList selectedDate={selectedDate} />
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
  container: {
    flex: 1,
    // height: "100%",
  },
});

export default Screen;
