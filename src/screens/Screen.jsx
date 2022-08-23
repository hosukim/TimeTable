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

  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", (e) => {
  //     console.log(e.endCoordinates.height);
  //     formRef.current.state.bottom = 0;
  //   });
  // }, []);

  return (
    // <View style={styles.wrap}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.wrap}
      keyboardVerticalOffset={20}
      contentContainerStyle={{ flex: 1, backgroundColor: "blue" }}
    >
      <Tab selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <TimeTable
        selectedDate={selectedDate}
        setSeletedTimeArray={setSeletedTimeArray}
      />
      {selectedTimeArray.length !== 0 ? (
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
        >
          <SubmitForm
            selectedDate={selectedDate}
            selectedTimeArray={selectedTimeArray}
            clearTimeArray={clearTimeArray}
          />
        </TouchableWithoutFeedback>
      ) : (
        <ScheduleList selectedDate={selectedDate} />
      )}
    </KeyboardAvoidingView>
    // </View>
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
  },
});

export default Screen;
