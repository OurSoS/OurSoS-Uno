import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import DisasterCard from "../components/DisastersCard";
import {useState} from "react";

import {
  useFonts,
  NotoSans_400Regular,
} from '@expo-google-fonts/dev';


export default function News() {

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>My Dashboard</Text>
      <TextInput
        placeholder="Search locations and friends"
        style={styles.searchInput}
      ></TextInput>

      <View id="DisasterCardsContainer" style={styles.disasterCardContainer}>
        <View id="DisasterCard" style={styles.disasterCard}>
          <Image
            source={{ uri: "https://loremflickr.com/320/240/wildfireforest" }}
            style={[{ width: 160, height: 100 }, styles.disasterCardImage]}
          />
          <Text style={styles.disasterCardHeader}>Emergency</Text>
          <Text>Kelowna Wildfire Live Updates</Text>
        </View>
        <View id="DisasterCard" style={styles.disasterCard}>
          <Image
            source={{ uri: "https://loremflickr.com/320/240/poweroutage" }}
            style={[{ width: 160, height: 100 }, styles.disasterCardImage]}
          />
          <Text style={styles.disasterCardHeader}>Power Outage</Text>
          <Text></Text>
        </View>
      </View>

      <View id="Map">
        <Image
          source={{ uri: "../assets/TEMP_map.png" }}
          style={[{ width: "100%", height: 200 }, styles.disasterCardImage]}
        />
      </View>

      <View id="PinsContainer">
        <View id="PinsHeader" style={styles.pinsHeader}>
          <Text>Pins</Text>
          <Text>View More</Text>
        </View>
        <View id="PinsContent" style={styles.pinsContent}>
          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/vancouver" }}
              style={styles.pinImage}
            />
            <Text style={styles.pinName}>Vancouver</Text>
          </View>

          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/kelowna" }}
              style={[{ width: 160, height: 100 }, styles.pinImage]}
            />
            <Text style={styles.pinName}>Kelowna</Text>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
const halfScreenWidth = Dimensions.get("window").width / 2 - 20;
const styles = StyleSheet.create({
  container: {
    margin: 20,
    fontFamily: "NotoSans_400Regular",
  },
  searchInput: {
    borderRadius: 62,
    backgroundColor: "white", // Use 'white' for #FFF
    // Dashboard/Card
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 3, // This adds an elevation for shadow on Android
  },
  heading2: {
    marginTop: 40,
    marginBottom: 20,
    margin:20,
    color: "#252525", // Use '#252525' for var(--Black, #252525)
    fontFamily: "NotoSans_400Regular",
    fontSize: 28,
    fontStyle: "normal",
    fontWeight: "500", // Use '500' for font-weight: 500
  },

  inputSearchIcon: {
    backgroundColor: "#FFC300",
  },
  disasterCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute space evenly between items
    margin: 10,
  },
  disasterCard: {
    width: "48%", // Set width to 48% to fit two cards on the screen horizontally
    backgroundColor: "white",
    borderRadius: 15,
    height: 200,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
  },
  disasterCardImage: {
    margin: 10,
    borderRadius: 15,
    width: "100%",
  },
  disasterCardHeader: {
    color: "#000",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "500",
    margin: 10,
  },
  disasterCardText: {
    color: "#000",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal",
    margin: 10,
  },
  pin: {
    position: "relative", // Change to "relative" if you don't need absolute positioning
    flex: 1,
    flexDirection: "row",
  },
  pinImage: {
    width: '100%',
    height: 200,
    gap: 10,
    borderRadius: 15,
  },
  pinName: {
    color: "white", // Set text color to black
    fontSize: 24,
    position: "absolute", // Use "absolute" positioning
    bottom: 10, // Adjust the position as needed
    left: 10, // Adjust the position as needed
  },
  pinsHeader: {
    flex: 1,
    flexDirection: "row", // Change this to 'row'
    justifyContent: "space-between",
    margin: 10,
    height: 1,
  },
  pinsContent: {
    flexDirection: "row", // Change this to 'row'
    margin: 10,
    gap: 20
  },
});
