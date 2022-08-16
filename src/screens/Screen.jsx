import { StyleSheet, View } from "react-native";
import Tab from "./tab/Tab";
import TimeTable from "./timetable/TimeTable";
import {
  TapGestureHandler,
  RotationGestureHandler,
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const Screen = () => {
  return (
    <GestureHandlerRootView>
      <View style={styles.wrap}>
        <Tab />
        <TimeTable />
      </View>
    </GestureHandlerRootView>
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
