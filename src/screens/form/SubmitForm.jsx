import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ControllButtons from "./buttons/ControllButtons";
import InputForm from "./inputForm/InputForm";

function SubmitForm() {
  const [values, setValues] = useState({
    title: null,
    startDate: null,
    endDate: null,
    memo: null,
  });
  const onSubmit = () => {};

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
