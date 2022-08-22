import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkStorageIncludesScheduleByDate = async (formatDate) => {
  let keys = await AsyncStorage.getAllKeys();
  return keys.includes(formatDate);
};
