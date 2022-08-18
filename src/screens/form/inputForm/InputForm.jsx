import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

function InputForm({ setValues }) {
  const onChangeHandler = (name, text) => {
    setValues((prev) => ({
      ...prev,
      [name]: text,
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
        <TextInput
          style={stlyes.input}
          placeholder="Time"
          onChange={(e) => onChangeHandler("time", e.nativeEvent.text)}
        />
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
});

export default InputForm;
