import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react"
import { StyleSheet, Text, View, TextInput, Dimensions,  } from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios"
import DisasterCard from "../components/DisastersCard";
// import {useState} from "react";
//! TODO: implement - https://github.com/meliorence/react-native-snap-carousel#react-native-snap-carousel
// import Carousel from 'react-native-snap-carousel';

import {
  useFonts,
  NotoSans_400Regular,
} from '@expo-google-fonts/dev';


type newsItemType = {
    "date": string,
    "link": string,
    "position": number,
    "snippet": string,
    "source": string,
    "thumbnail": string,
    "title": string
}

export default function News() {

  const [news,setNews] = useState<newsItemType[]>([]);

  useEffect(() => {
    axios.get('https://oursos-backend-production.up.railway.app/news')
    .then((response) => {
      setNews(response.data);
      console.log(response.data);
    })
    .catch((error) => console.error(error))
  },[])

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
        {news && news.map((newsItem) => {
          return(
            <View id="DisasterCard" style={styles.disasterOuterCard}>
              <View style={styles.disasterInnerCard}>
                <Image
                  source={{ uri: newsItem.thumbnail }}
                  style={[{ height: 120, objectFit: "cover" }, styles.disasterCardImage]}
                />
                <Text style={styles.disasterCardHeader}>{newsItem.title}</Text>
                <Text style={styles.disasterCardText}>{newsItem.snippet}</Text>
              </View>
            </View>
          )
        })}
      </View>

      <View id="Map">
        <Image
          source={{ uri: "../assets/TEMP_map.png" }}
          style={[{ width: "100%", height: 200 }, styles.disasterCardImage]}
        />
      </View>

      <View id="PinsContainer">
        <View id="PinsHeader" style={styles.pinsHeader}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>Pins</Text>
          <Link href={"/pins"}>
            <Text style={{fontSize: 20}}>View More</Text>
          </Link>
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
    backgroundColor: "#F5F5F5", // Choose your preferred background color
    padding: 10, // Add some padding around the container
    borderRadius: 10, // Apply rounded corners
  },
  disasterOuterCard: {
    width: 300, 
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
    margin: 10,
    
  },
  disasterInnerCard: {
    padding:20,
  },
  disasterCardImage: {
    // margin: 10,
    borderRadius: 15,
    // width: "100%",
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
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "normal",
    margin: 10,
    padding:10,
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
    flexDirection: "row", 
    justifyContent: "space-between",
    margin: 10,
    height: 1,
  },
  pinsContent: {
    flexDirection: "row", 
    margin: 10,
    gap: 20
  },
});
