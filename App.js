import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Screen from "@screens/Screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="main">
            <Stack.Screen
              name="main"
              component={Screen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "flex-start",
    marginTop: "10%",
    // backgroundColor: 'red',
  },
});
