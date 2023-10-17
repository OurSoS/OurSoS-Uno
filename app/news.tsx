import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import DisasterCard from "../components/DisastersCard";
import { styles } from "./styles/newsStyles";

import Swiper from "react-native-swiper";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/dev";

type newsItemType = {
  date: string;
  link: string;
  position: number;
  snippet: string;
  source: string;
  thumbnail: string;
  title: string;
};

export default function News() {
  const [news, setNews] = useState<newsItemType[]>([]);

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/news")
      .then((response) => {
        setNews(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

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

      <Swiper style={{ height: 380 }} showsPagination={false}>
        {news &&
          news.map((newsItem, i) => {
            if (i % 2 === 0) {
              return (
                <View key={i} style={{ flexDirection: "row" }}>
                  <View
                    id="DisasterCard"
                    style={[
                      styles.disasterOuterCard,
                      { flex: 1, marginRight: 10 },
                    ]}
                  >
                    <Link href={`/news/article/${newsItem.title}`}>
                      <View style={styles.disasterInnerCard}>
                        <Image
                          source={{ uri: newsItem.thumbnail }}
                          style={[
                            { height: 120, objectFit: "cover" },
                            styles.disasterCardImage,
                          ]}
                        />
                        <Text style={styles.disasterCardHeader}>
                          {newsItem.title}
                        </Text>
                        <Text style={styles.disasterCardText}>
                          {newsItem.snippet}
                        </Text>
                      </View>
                    </Link>
                  </View>
                  {i + 1 < news.length && (
                    <View
                      id="DisasterCard"
                      style={[
                        styles.disasterOuterCard,
                        { flex: 1, marginLeft: 10 },
                      ]}
                    >
                      <Link href={`/news/article/${news[i+1].title}`}>
                        <View style={styles.disasterInnerCard}>
                          <Image
                            source={{ uri: news[i + 1].thumbnail }}
                            style={[
                              { height: 120, objectFit: "cover" },
                              styles.disasterCardImage,
                            ]}
                          />
                          <Text style={styles.disasterCardHeader}>
                            {news[i + 1].title}
                          </Text>
                          <Text style={styles.disasterCardText}>
                            {news[i + 1].snippet}
                          </Text>
                        </View>
                      </Link>
                    </View>
                  )}
                </View>
              );
            }
          })}
      </Swiper>
      <View id="Map">
        <Image
          source={{ uri: "../assets/TEMP_map.png" }}
          style={[{ width: "100%", height: 200 }, styles.disasterCardImage]}
        />
      </View>

      <View id="PinsContainer">
        <View id="PinsHeader" style={styles.pinsHeader}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pins</Text>
          <Link href={"/pins"}>
            <Text style={{ fontSize: 20 }}>View More</Text>
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

      <View id="FriendsContainer">
        <View id="FriendsHeader" style={styles.FriendsHeader}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Friends</Text>
          <Link href={"/friends"}>
            <Text style={{ fontSize: 20 }}>View More</Text>
          </Link>
        </View>
        <View id="FriendsContent" style={styles.FriendsContent}>
          {/* {map goes here} */}

          <View id="Friend" style={styles.friend}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/portrait" }}
              style={styles.FriendImage}
            />
            <Text style={styles.FriendName}>Sarah</Text>
          </View>
          <View id="Friend" style={styles.friend}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/portrait" }}
              style={styles.FriendImage}
            />
            <Text style={styles.FriendName}>Sarah</Text>
          </View>

          <View id="Friend" style={styles.friend}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/portrait" }}
              style={styles.FriendImage}
            />
            <Text style={styles.FriendName}>Sarah</Text>
          </View>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
const halfScreenWidth = Dimensions.get("window").width / 2 - 20;
