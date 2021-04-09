import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  View,
} from "react-native";
// import Linking from 'expo-linking';
import SvgUri from 'react-native-svg-uri';
import * as WebBrowser from 'expo-web-browser';
import myData from "../db/db_sfg.json"
import APlusPhoto from "../assets/A+.png";
import APhoto from "../assets/A.png";
import AMinusPhoto from "../assets/A-.png";
import BPlusPhoto from "../assets/B+.png";
import BPhoto from "../assets/B.png";
import BMinusPhoto from "../assets/B-.png";
import CPlusPhoto from "../assets/C+.png";
import CPhoto from "../assets/C.png";
import CMinusPhoto from "../assets/C-.png";
import DPlusPhoto from "../assets/D+.png";
import DPhoto from "../assets/D.png";
import DMinusPhoto from "../assets/D-.png";
import FPhoto from "../assets/F.png";
import { FileSystem } from "react-native-unimodules";

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

  _handlePress = () => {
    WebBrowser.openBrowserAsync("https://betterworldshopper.org/the-research/");
  }

  _handleAusPress = () => {
    WebBrowser.openBrowserAsync("https://www.ethical.org.au/about/ratings/");
  }

  showGrade(myBrand){
    var givenGrade = ""
    if(myData.hasOwnProperty(myBrand)){
      givenGrade = myData[myBrand]["grade"];
      switch(givenGrade) {
        case 'A+':
          return (
            <View style={styles.container}>
                <Image style={styles.imageGrade} source={APlusPhoto}/>
                <Text style={styles.centerText}>These companies are social and environmental leaders in their category</Text>
            </View>
          )
        case 'A':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={APhoto}/>
              <Text style={styles.centerText}>These companies are social and environmental leaders in their category</Text>
            </View>
          )
        case 'A-':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={AMinusPhoto}/>
              <Text style={styles.centerText}>These companies are social and environmental leaders in their category</Text>
            </View>
          )
        case 'B+':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={BPlusPhoto}/>
              <Text style={styles.centerText}>These tend to be mainstream companies taking social/environmental responsibility seriously</Text>
            </View>
          )
        case 'B':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={BPhoto}/>
              <Text style={styles.centerText}>These tend to be mainstream companies taking social/environmental responsibility seriously</Text>
            </View>
          )
        case 'B-':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={BMinusPhoto}/>
              <Text style={styles.centerText}>These tend to be mainstream companies taking social/environmental responsibility seriously</Text>
            </View>
          )
        case 'C+':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={CPlusPhoto}/>
              <Text style={styles.centerText}>These companies have either mixed social and environmental records or insufficient data available to rank them</Text>
            </View>
          )
        case 'C':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={CPhoto}/>
              <Text style={styles.centerText}>These companies have either mixed social and environmental records or insufficient data available to rank them</Text>
            </View>
          )
        case 'C-':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={CMinusPhoto}/>
              <Text style={styles.centerText}>These companies have either mixed social and environmental records or insufficient data available to rank them</Text>
            </View>
          )
        case 'D+':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={DPlusPhoto}/>
              <Text style={styles.centerText}>These engage in practices that have significant negative impacts on people and the planet</Text>
            </View>
          )
        case 'D':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={DPhoto}/>
              <Text style={styles.centerText}>These engage in practices that have significant negative impacts on people and the planet</Text>
            </View>
          )
        case 'D-':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={DMinusPhoto}/>
              <Text style={styles.centerText}>These engage in practices that have significant negative impacts on people and the planet</Text>
            </View>
          )
        case 'F':
          return (
            <View style={styles.container}>
              <Image style={styles.imageGrade} source={FPhoto}/>
              <Text style={styles.centerText}>These companies have the worst social and environmental records in the industry</Text>
            </View>
          )
        default:
          return <Text>Whoa we really didn't find anything</Text>
      }
    }
    else{
      return <Text>We did not find any grade for this given product.</Text>
    }
  }

  // showBrandLogo(myBrand){
  //   console.log(myBrand)
  //   var brandLogoUrl = "https://cdn.worldvectorlogo.com/logos/" + myBrand + ".svg";
  //   try{
  //     return <SvgUri source={{uri: brandLogoUrl}} style={styles.brandLogo}/>
  //   }
  //   catch(err){
  //     console.log(err);
  //     return <Text>No brand logo readily found</Text>
  //   }
  // }

  render() {
    // Show loading animation while waiting for information
    if (this.state.isLoading || !this.state.data) {
      return (
        <SafeAreaView style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#00ff00" />
        </SafeAreaView>
      );
    }

    // After fetching information, return the information
    else{
      // console.log(this.state.data);
      if(this.state.data.code === "OK" && this.state.data.items[0]){
        return (
          <SafeAreaView style={styles.container}>
            {/* {this.showBrandLogo(this.state.data.items[0].brand.toLowerCase())} */}
            <Text>The barcode you scanned is: {this.state.barcode}</Text>
            <Text>The brand is: {this.state.data.items[0].brand}</Text>
            {this.showGrade(this.state.data.items[0].brand.toLowerCase())}
            <Text style={styles.bhsLink} onPress={this._handlePress}>Click here for more information on the research and ranking</Text>
            <Text style={styles.bhsLink} onPress={this._handleAusPress}>Click here to search very detailed praises and criticism for companies</Text>
            <StatusBar style="auto" />
          </SafeAreaView>
        );
      }
      else{
        return(
          <SafeAreaView style={styles.container}>
            <Text style={styles.centerText}>The barcode you submitted was either not valid or taking longer than expected to gete results.</Text>
            <Text style={styles.centerText}>Please try again, or another barcode!</Text>
          </SafeAreaView>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  imageGrade: {
    paddingTop: 10,
    width: 125,
    height: 125
  },
  bhsLink: {
    paddingTop: 100,
    fontSize: 10,
    color: "blue",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textDecorationLine: "underline"
  },
  centerText: {
    paddingTop: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
