import React from "react";
import { StyleSheet, Text, SafeAreaView, StatusBar } from "react-native";

function MyBarcodeShow(props) {
  const { route } = props;
  const { barcode } = route.params;
  var myURL = "https://api.upcitemdb.com/prod/trial/lookup?upc=" + barcode;
  // fetch(myURL).then((response) => console.log(typeof response));
  return (
    <SafeAreaView style={styles.container}>
      <Text>The barcode you scanned is: {myURL} </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyBarcodeShow;
