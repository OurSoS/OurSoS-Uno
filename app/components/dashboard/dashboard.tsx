import React from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
// import tw from "twrnc";
import axios from "axios";
import Slider from "../molecules/slider";
import MapComp from "../molecules/map-comp";
import { Text, Snackbar } from "react-native-paper";
import { router } from "expo-router";
import FriendsList from "../molecules/friends";
import tw from "../../../lib/tailwind";
import AddFriend from "../../components/molecules/AddFriend";
import publicIP from "react-native-public-ip";

type newsItemType = {
  date: string;
  link: string;
  position: number;
  snippet: string;
  source: string;
  thumbnail: string;
  title: string;
};

export default function Dashboard({
  userLang,
  user,
}: {
  userLang: string;
  user: any;
}) {
  const [userName, setUserName] = useState("");
  const [news, setNews] = useState<newsItemType[]>([]);
  const [translatedNews, setTranslatedNews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [pins, setPins] = useState(user?.locations);
  const [friends, setFriends] = useState(user?.friends);
  const [snackData, setSnackData] = useState<any>({});
  const [city, setCity] = useState("");
  const onToggleSnackBar = (data: any) => {
    setSnackData(data);
    setVisible(!visible);
  };

  const onDismissSnackBar = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);

  // get user loacation based on the device public ip address
  useEffect(() => {
    publicIP()
      .then((ip) => {
        axios
          .get(`http://ip-api.com/json/${ip}`)
          .then((response) => {
            if (response.data && response.data.city) {
              setCity(response.data.city);
            }
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const newsResponse = await fetch(
          `https://oursos-backend-production.up.railway.app/news`
        );
        if (!newsResponse.ok) throw new Error("Network response was not ok.");
        const newsData: newsItemType[] = await newsResponse.json();
        setNews(newsData);
        let translationData: {
          [key: string]: { title: string; snippet: string };
        } = {};
        newsData.forEach((item, i) => {
          translationData[i.toString()] = {
            title: item.title,
            snippet: item.snippet,
          };
        });

        // const translateResponse = await fetch(
        //   "https://oursos-backend-production.up.railway.app/translateobject",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       translateObject: translationData,
        //       lang: userLang,
        //     }),
        //   }
        // );
        // if (!translateResponse.ok)
        //   throw new Error("Network response was not ok.");
        // const translatedNews = await translateResponse.json();
        // setTranslatedNews(translatedNews);
        // console.log("adsfsdafasdfsad", translatedNews);
      } catch (err) {
        console.error("Error in fetching or translating news:", err);
      }
    })();
  }, [userLang]);

  return (
    <View
      style={tw.style(
        `flex`,
        `h-full`,
        `flex-col`,
        `justify-between`,
        `w-full`,
        `relative`
      )}
    >
      <ImageBackground
        source={require("../../../assets/Intro/Map.png")}
        style={[tw.style("flex-1 justify-center"), { resizeMode: "cover" }]}
      >
        <ScrollView style={tw.style(`p-4`)}>
          {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
         /> */}

          <View style={tw.style(`flex-row items-center justify-between`)}>
            <View style={tw.style(`flex-row items-center`)}>
              <Image
                source={require("../../../assets/mapIcons/MeIcon.png")}
                style={tw.style(`w-10 h-10 ml-2`)}
                resizeMode="contain"
              />
              {city && <Text style={tw.style(`text-xl ml-2`)}>{city}</Text>}
            </View>
            <Image
              source={require("../../../assets/header_logo.png")}
              style={tw.style(`w-30 h-10 mr-2`)}
              resizeMode="contain"
            />
          </View>
          <Slider
            onToggleSnackBar={onToggleSnackBar}
            data={news}
            translatedData={translatedNews}
          />
          <View style={tw.style(`w-full`, `pt-0`, `pb-15`)}>
            <View
              style={tw.style(
                "border-solid border-[3] rounded-md border-[#001D3D]"
              )}
            >
              <MapComp
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                toolbarEnabled={false}
                height={300}
              />
            </View>
            <Pressable
              onPress={() => {
                router.push("/map");
              }}
              style={tw.style("absolute top-7 left-7")}
            >
              <View
                style={tw.style(
                  "bg-[#ffefd4] bg-opacity-80 rounded-sm items-center justify-center w-[9.5] h-[9.5]"
                )}
              >
                <Image
                  source={require("../../../assets/mapui/Expand-Map.png")}
                  resizeMode={"contain"}
                  style={tw.style(`h-7 aspect-1`)}
                />
              </View>
            </Pressable>
          </View>
          {/* <FriendsList /> */}
          <AddFriend />
        </ScrollView>
        <Snackbar
          style={tw.style(`bg-white dark:bg-black`, `rounded-t-lg`)}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Read More",
            onPress: () => {
              router.push(snackData.link);
            },
          }}
        >
          <View style={tw.style(`border-r`, `pr-5`)}>
            <View
              style={tw.style(
                `p-1`,
                `border-t`,
                `border-r`,
                `border-l`,
                `border-[#001D3D]`,
                `rounded-t-lg`
              )}
            >
              <Text>{snackData.snippet}</Text>
            </View>
            <View
              style={tw.style(
                `bg-[#001D3D]`,
                `border-transparent`,
                `rounded-b-lg`
              )}
            >
              <Text style={tw.style(`text-white text-center text-xs`)}>
                Source: {snackData.source}
              </Text>
            </View>
          </View>
        </Snackbar>
      </ImageBackground>
    </View>
  );
}
