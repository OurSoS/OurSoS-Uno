import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, Animated } from "react-native";
import { Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { styles } from "./styles/newsStyles";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/dev";
import Footer from "../components/Footer";

type UserType = {
  id: number;
  username: string;
  locations: string[];
  languagepreference: string;
  friends: number[];
};

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
  const [userLang, setUserLang] = useState("en");
  const [news, setNews] = useState<newsItemType[]>([
    // Initial data here as an example
  ]);

  useEffect(() => {
    axios
      .get<UserType>("https://oursos-backend-production.up.railway.app/users/1")
      .then((user) => {
        setUserLang(user.data.languagepreference);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // Fetch the news
        const response = await axios.get(
          "https://oursos-backend-production.up.railway.app/news"
        );
        const originalNews = response.data;

        // Translate the news based on user's language preference
        const translations = await Promise.all(
          originalNews.map((newsItem: { title: any; snippet: any }) => {
            const data = {
              text: `${newsItem.title}. ${newsItem.snippet}`,
              lang: userLang,
            };
            return axios.post(
              "https://oursos-backend-production.up.railway.app/translate",
              data
            );
          })
        );

        // Merge the translations with the original news
        const translatedNews = originalNews.map(
          (newsItem: any, index: number) => {
            const [translatedTitle, translatedSnippet] =
              translations[index].data.split(". ");
            return {
              ...newsItem,
              title: translatedTitle,
              snippet: translatedSnippet,
            };
          }
        );

        // Set the state
        setNews(translatedNews);
      } catch (error) {
        console.error("Error fetching or translating news:", error);
      }
    })();
  }, [userLang]);

  let [fontsLoaded] = useFonts({
    NotoSans_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (<>

    <ScrollView>
      <View>
        <Text style={styles.heading2}>My Dashboard</Text>
        <Image source={{ uri: "../assets/searchIcon.png" }} />
        <TextInput

          placeholder="Search locations and friends"
          style={styles.searchInput}
        ></TextInput>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        style={{ padding: 10 }}
      >
        {
          news.map((newsItem, i) => {
            return (<View key={i} style={{ flexDirection: "row" }}>
              <View
                id="DisasterCard"
                style={[styles.disasterOuterCard, { flex: 1, marginRight: 10 }]}
              >
                <Link href={`/news-article/${newsItem.position}`}>
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
            </View>
            )
          })
        }
      </ScrollView>

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
    </ScrollView>
    <Footer />
  </>);
}
