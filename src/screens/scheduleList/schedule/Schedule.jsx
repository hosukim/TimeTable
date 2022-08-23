import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Schedule({ time, title, index, onDelete, onUpdate }) {
  return (
    <View style={styles.item}>
      <View style={styles.time}>
        <Text>{time}</Text>
        <Text style={styles.split}></Text>
      </View>
      <View style={styles.title}>
        <Text>{title}</Text>
        <Text style={styles.split}></Text>
      </View>
      <View style={styles.util}>
        <TouchableOpacity
          style={[styles.button, { paddingRight: 10 }]}
          onPress={() => onUpdate(index)}
        >
          <Text style={styles.button}>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => onDelete(index)}>
          <Text style={{ color: "#ff181c" }}>삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    borderRadius: 5,
  },
  time: { flex: 1 },
  title: { flex: 2, marginLeft: 10 },
  util: {
    flex: 1,
    flexDirection: "row",
    // marginLeft: 5,
    justifyContent: "flex-end",
  },
  split: {
    position: "absolute",
    top: "50%",
    right: 0,
    width: 1,
    height: 14,
    marginTop: -7,
    backgroundColor: "#0000000f",
  },
  button: {
    alignItems: "center",
    paddingLeft: 5,
    color: "#0084fe",
  },
});

export default Schedule;
