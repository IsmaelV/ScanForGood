import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";

export default class MyBarcodeShow extends React.Component {
  constructor(props) {
    super(props);
    const { route } = props;
    const { barcode } = route.params;
    var myURL = "https://api.upcitemdb.com/prod/trial/lookup?upc=" + barcode;
    this.state = {
      isLoading: true,
      data: null,
      myURL: myURL,
      barcode: barcode,
    };
  }

  componentDidMount() {
    return fetch(this.state.myURL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    // Show loading animation while waiting for information
    if (this.state.isLoading) {
      return (
        <SafeAreaView style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </SafeAreaView>
      );
    }

    // After fetching information, return the information
    return (
      <SafeAreaView style={styles.container}>
        <Text>The barcode you scanned is: {this.state.barcode} </Text>
        <Text>The brand is: {this.state.data.items[0].brand}</Text>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
