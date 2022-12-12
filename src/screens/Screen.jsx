import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import SubmitForm from "./form/SubmitForm";
import ScheduleList from "./scheduleList/ScheduleList";
import Tab from "./tab/Tab";
import TimeTable from "./timeTable/TimeTable";

const Screen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeArray, setSelectedTimeArray] = useState([]);

  const clearTimeArray = () => {
    setSelectedTimeArray([]);
  };

  useEffect(() => {
    clearTimeArray();
  }, [selectedDate]);

  return (
    <View style={styles.wrap}>
      <Tab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <TimeTable
        selectedDate={selectedDate}
        selectedTimeArray={selectedTimeArray}
        setSelectedTimeArray={setSelectedTimeArray}
      />
      {selectedTimeArray.length !== 0 && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          keyboardVerticalOffset={100}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SubmitForm
              selectedDate={selectedDate}
              selectedTimeArray={selectedTimeArray}
              clearTimeArray={clearTimeArray}
            />
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
      <ScheduleList selectedDate={selectedDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    // width: "100%",
    // height: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    // position: "relative",
  },
  container: {
    flex: 1,
    zIndex: 99,
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 10,
    height: 310,
  },
});

export default Screen;
