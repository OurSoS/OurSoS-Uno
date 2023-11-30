import React from "react";
import { View, Image, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
// import tw from "twrnc";
import axios from "axios";
import Slider from "../molecules/slider";
import MapComp from "../molecules/map-comp";
import { Text, Snackbar } from "react-native-paper";
import { router } from "expo-router";
import Footer from "../molecules/Footer";
import tw from "../../../lib/tailwind";

type newsItemType = {
  date: string;
  link: string;
  position: number;
  snippet: string;
  source: string;
  thumbnail: string;
  title: string;
};

type friendType = {
  id: number;
  name: string;
  image: any;
};

const fakeFriends: friendType[] = [
  { id: 1, name: "Tony", image: require("../../../assets/avatars/Avatar.png") },
  { id: 2, name: "Moh", image: require("../../../assets/avatars/Avatar.png") },
  {
    id: 3,
    name: "Paarth",
    image: require("../../../assets/avatars/Avatar.png"),
  },
];

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
  {
    /*const [friends, setFriends] = useState(user?.friends); */
  }
  const [friends, setFriends] = useState<friendType[]>(fakeFriends);
  const [snackData, setSnackData] = useState<any>({});
  const onToggleSnackBar = (data: any) => {
    setSnackData(data);
    setVisible(!visible);
  };

  const onDismissSnackBar = () => setVisible(false);
  const onChangeSearch = (query: string) => setSearchQuery(query);

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
    <>
      <View style={tw.style("flex flex-col justify-between h-full")}>
        {/* Main content ScrollView */}
        <ScrollView style={tw.style("p-4 flex-grow")}>
          {/* Header Logo */}
          <Image
            source={require("../../../assets/header_logo.png")}
            style={tw.style("w-full h-20")}
            resizeMode="contain"
          />

          {/* Map Component */}
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
            {/* Expand Map Button */}
            <Pressable
              onPress={() => {
                /* router.push("/map"); */
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
                  style={tw.style("h-7 aspect-1")}
                />
              </View>
            </Pressable>
          </View>

          {/* News Slider */}
          <Slider
            onToggleSnackBar={() => {
              /* Snackbar handling */
            }}
            data={news}
            translatedData={translatedNews}
          />

          {/* Friends Section */}
          <View style={tw.style("flex-row items-center justify-between my-4")}>
  <Text style={tw.style("text-black text-[1.5rem]")}>Friends</Text>
  <Pressable
    onPress={() => {
      /* Navigate to view more friends */
    }}
    style={tw.style("bg-blue-100 rounded-md p-2")}
  >
    <Text style={tw.style("text-white")}>View More</Text>
  </Pressable>
</View>
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={tw.style("flex-row")}
>
  {friends.map((friend, index) => (
    <Pressable
      key={index}
      onPress={() => {
        /* Navigate to friend's profile */
      }}
      style={tw.style("mr-4 mb-6")}
    >
      <Image
        source={friend.image}
        style={tw.style("w-24 h-24 rounded-full mb-2")}
      />
      <Text style={tw.style("text-center text-black")}>
        {friend.name}
      </Text>
    </Pressable>
  ))}
</ScrollView>


        {/* Footer Navigation */}
        <Footer />
      </View>
    </>
  );
}