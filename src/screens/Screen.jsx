import { StyleSheet, View } from "react-native";
import Tab from "./tab/Tab";

const Screen = () => {
  return (
    <View style={styles.wrap}>
      <Tab />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Screen;
