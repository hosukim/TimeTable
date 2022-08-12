import { Button, StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dates from "@screens/tab/dates/Dates";

const Tab = () => {
  const onPressPrevButton = () => {
    alert(1);
  };
  const onPressNextButton = () => {
    alert(2);
  };
  return (
    <View style={styles.block}>
      <AntDesign name="left" size={20} onPress={onPressPrevButton} />
      <Dates />
      <AntDesign name="right" size={20} onPress={onPressNextButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
});

export default Tab;
