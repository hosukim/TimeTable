import React from "react";
import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

function ControllButtons({ onSubmit, onClose }) {
  const onPressDeleteButton = () => {};
  return (
    <View style={styles.block}>
      <View style={styles.left}>
        <AntDesign
          name="close"
          size={30}
          onPress={onClose}
          style={styles.button}
        />
      </View>
      <View style={styles.right}>
        <AntDesign
          name="delete"
          size={25}
          onPress={onPressDeleteButton}
          style={styles.button}
        />
        <AntDesign
          name="check"
          size={30}
          onPress={onSubmit}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 0.2,
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "center",
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    marginLeft: 6,
    marginRight: 6,
    padding: 2,
    opacity: 0.7,
  },
});

export default ControllButtons;
