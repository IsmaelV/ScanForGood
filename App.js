import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

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

const MyBarcodeScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={({ type, data }) =>
          navigation.navigate("BarShow", { barcode: data })
        }
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const MyBarcodeShow = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>The barcode you scanned is: {route.params.barcode} </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
