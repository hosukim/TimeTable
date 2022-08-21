import React, { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format2Words } from "@utils/DateUtil";

function InputForm({ setValues, selectedTimeArray }) {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [startTimePickerShow, setStartTimePickerShow] = useState(false);
  const [endTimePickerShow, setEndTimePickerShow] = useState(false);

  useEffect(() => {
    if (Array.isArray(selectedTimeArray) && selectedTimeArray.length !== 0) {
      setStartTime(
        new Date(
          startTime.getFullYear(),
          startTime.getMonth(),
          startTime.getDate(),
          Number(selectedTimeArray[0]) - 1
        )
      );
      setEndTime(
        new Date(
          endTime.getFullYear(),
          endTime.getMonth(),
          endTime.getDate(),
          Number(selectedTimeArray[selectedTimeArray.length - 1])
        )
      );
    }
  }, [selectedTimeArray]);

  useEffect(() => {
    console.log("---endTiem : " + endTime);
  }, [endTime]);

  const onChangeHandler = (name, text) => {
    setValues((prev) => ({
      ...prev,
      [name]: text,
    }));
  };
  const onChangeStartTime = (event, selectedTime) => {
    console.log("selectedTime: " + selectedTime);
    setStartTimePickerShow(false);
    setStartTime(selectedTime);
    setValues((prev) => ({
      ...prev,
      ["startTime"]: selectedTime,
    }));
  };
  const onChangeEndTime = (event, selectedTime) => {
    console.log("selectedTime: " + selectedTime);
    setEndTimePickerShow(false);
    setEndTime(selectedTime);
    setValues((prev) => ({
      ...prev,
      ["endTime"]: selectedTime,
    }));
  };
  return (
    <View style={stlyes.container}>
      <View style={stlyes.block}>
        <Text style={stlyes.title}>Title</Text>
        <TextInput
          style={stlyes.input}
          placeholder="Title"
          onChange={(e) => onChangeHandler("title", e.nativeEvent.text)}
        />
      </View>
      <View style={stlyes.block}>
        <Text style={stlyes.title}>Time</Text>
        <View style={stlyes.timeBlock}>
          <Pressable
            onPress={() => setStartTimePickerShow(true)}
            style={stlyes.timeInputWrap}
          >
            <TextInput
              editable={false}
              value={`${format2Words(startTime.getHours())} : ${format2Words(
                startTime.getMinutes()
              )}`}
              style={[stlyes.timeInput]}
            />
          </Pressable>
          <Text>-</Text>
          <Pressable
            onPress={() => setEndTimePickerShow(true)}
            style={stlyes.timeInputWrap}
          >
            <TextInput
              editable={false}
              value={`${format2Words(endTime.getHours())} : ${format2Words(
                endTime.getMinutes()
              )}`}
              style={stlyes.timeInput}
            />
          </Pressable>
        </View>
        {startTimePickerShow && (
          <DateTimePicker
            testID="startTime"
            value={startTime}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeStartTime}
          />
        )}
        {endTimePickerShow && (
          <DateTimePicker
            testID="endTime"
            value={endTime}
            mode={"time"}
            is24Hour={true}
            onChange={onChangeEndTime}
          />
        )}
      </View>
      <View style={stlyes.block}>
        <Text style={stlyes.title}>Memo</Text>
        <TextInput
          style={stlyes.input}
          placeholder="Memo"
          onChange={(e) => onChangeHandler("memo", e.nativeEvent.text)}
        />
      </View>
    </View>
  );
}

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    textAlign: "left",
    fontSize: 15,
  },
  input: {
    height: 40,
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
  },
  timeBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInput: {
    // flex: 1,
    width: "90%",
    height: 40,
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  timeInputWrap: {
    flex: 1,
  },
});

export default InputForm;
