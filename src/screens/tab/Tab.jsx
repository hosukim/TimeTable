import { StyleSheet, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Dates from "@screens/tab/dates/Dates";
import { useMemo, useState } from "react";
import { getOneWeekByDate, WEEK } from "@utils/DateUtil";

const Tab = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tempDateForRender, setTempDateForRender] = useState(new Date());
  const renderedWeek = useMemo(() => {
    return getOneWeekByDate(tempDateForRender);
  }, [tempDateForRender]);

  const onPressDateButton = (index) => {
    setSelectedDate(renderedWeek[index]);
  };

  const onPressPrevButton = () => {
    setTempDateForRender(
      new Date(tempDateForRender.setDate(tempDateForRender.getDate() - WEEK))
    );
  };

  const onPressNextButton = () => {
    setTempDateForRender(
      new Date(tempDateForRender.setDate(tempDateForRender.getDate() + WEEK))
    );
  };
  return (
    <View style={styles.block}>
      <AntDesign name="left" size={20} onPress={onPressPrevButton} />
      <Dates
        selectedDate={selectedDate}
        renderedWeek={renderedWeek}
        onPressDateButton={onPressDateButton}
      />
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
    // flex: 1,
  },
});

export default Tab;
