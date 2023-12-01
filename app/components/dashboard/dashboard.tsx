import React from "react";
import { View, Image, ScrollView, Pressable } from "react-native";
import { useEffect, useState, useCallback } from "react";
// import tw from "twrnc";
import axios from "axios";
import Slider from "../molecules/slider";
import MapComp from "../molecules/map-comp";
import { Text, Snackbar } from "react-native-paper";
import { router } from "expo-router";
import tw from "../../../lib/tailwind";
import Footer from "../molecules/Footer"; 

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
  const [isMapReady, setIsMapReady] = useState(false);

  const onMapLayout = useCallback(() => {
    setIsMapReady(true);
  }, []);

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
      <View style={tw.style("flex")}>
        <View style={tw.style(`flex flex-col justify-between h-full`)}>
          <ScrollView style={tw.style(`p-4`)}>
            {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> */}

            <View style={tw.style(`flex`)}>
              {/* <Text style={tw.style(`text-[1.75rem]`)}>Vancouver</Text> */}
              <Image
                source={require("../../../assets/header_logo.png")}
                style={tw.style(`w-full h-20`)}
                resizeMode="contain"
              />
            </View>
            <View style={tw.style(`flex`)}>
              <View
                style={tw.style(
                  "border-solid border-[3] rounded-md border-[#001D3D]",
                  { height: 300 }
                )}
                onLayout={onMapLayout}
              >
                {isMapReady && (
                  <MapComp
                    zoomEnabled={false}
                    pitchEnabled={false}
                    scrollEnabled={false}
                    toolbarEnabled={false}
                  />
                )}
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

            <Slider
              onToggleSnackBar={onToggleSnackBar}
              data={news}
              translatedData={translatedNews}
            />
            <View style={tw.style(`w-full`, `pt-0`, `pb-15`)}>
              {/* <View
            style={tw.style(
              `flex`,
              `flex-row`,
              `justify-between`,
              `w-full`,
              `items-center`
            )}
          >
            <Text style={tw.style(`text-[1.5rem]`)}>Friends</Text>
            <Button>View More</Button>
          </View> */}
              {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            style={{ padding: 10 }}
            contentContainerStyle={{ justifyContent: "flex-start" }}
          >
            {friends?.map((pin: any, i: number) => {
              let text = "Henry";
              let imgUrl = "https://i.imgur.com/0LKZQYM.png";
              return (
                <ImageText
                  key={i}
                  text={text}
                  style="circle"
                  imageUrl={imgUrl}
                />
              );
            })}
           
          </ScrollView> */}
            </View>
            {/* <FriendsList /> */}
          </ScrollView>
          <Footer />
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
        </View>
      </View>
    </>
  );
}
