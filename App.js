import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MyBarcodeShow from "./components/MyBarcodeShow";
import MyBarcodeScanner from "./components/MyBarcodeScanner";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyBarcodeScanner} />
        <Stack.Screen name="BarShow" component={MyBarcodeShow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
