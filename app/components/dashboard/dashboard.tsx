import React, { Suspense } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
  Platform,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
// import tw from "twrnc";
import axios from "axios";
import Slider from "../molecules/slider";
import MapComp from "../molecules/map-comp";
import { Snackbar } from "react-native-paper";
import { router } from "expo-router";
import tw from "../../../lib/tailwind";
import publicIP from "react-native-public-ip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDeviceId } from "../../chat";
import MapLoading from "../molecules/map-loading";
import CardLoading from "../molecules/card-loading";

type newsItemType = {
  date: string;
  link: string;
  position: number;
  snippet: string;
  source: string;
  thumbnail: string;
  title: string;
};

export default function Dashboard({ user }: { user: any }) {
  const [news, setNews] = useState<newsItemType[]>([]);
  const [translatedNews, setTranslatedNews] = useState<any[]>([]);
  const [visible, setVisible] = useState(false);
  const [snackData, setSnackData] = useState<any>({});
  const [city, setCity] = useState("");
  const [friendsLocation, setFriendsLocation] = useState<any>([]);
  const [goToFriendLat, setGoToFriendLat] = useState(0);
  const [goToFriendLong, setGoToFriendLong] = useState(0);
  const [translatedData, setTranslatedData] = useState<any>([]);
  const [userLang, setUserLang] = useState("en");
  const [currentUser, setCurrentUser] = useState<any>(user);
  useEffect(() => {
    (async () => {


    })();
  }, []);

  const onToggleSnackBar = (data: any) => {
    setSnackData(data);
    setVisible(!visible);
  };

  const onDismissSnackBar = () => setVisible(false);
  // get user loacation based on the device public ip address
  useEffect(() => {
    publicIP()
      .then((ip) => {
        console.log("==================ip==================", ip);
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
      let currentUser = JSON.parse(
        await AsyncStorage.getItem('currentUser') || ""
      );
      await axios
        .post(
          `https://oursos-backend-production.up.railway.app/news/${currentUser.languagepreference}`
        )
        .then((response) => {
          setNews(response.data);
        });

      let data = JSON.parse(
        await AsyncStorage.getItem('translatedData') || ""
      );
      setTranslatedData(data);

      setCurrentUser(currentUser);
      setUserLang(currentUser.languagepreference);
    })();
  }, [userLang]);

  useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
        await AsyncStorage.getItem('currentUser') || ""
      );
      const res = await fetch(
        `https://oursos-backend-production.up.railway.app/getfriendsforuser/${currentUser.id}`
      );
      const data = await res.json();
      data.map((friend: any) => {
        setFriendsLocation((prev: any) => [
          ...prev,
          {
            id: friend.id,
            longitude: friend.long,
            latitude: friend.lat,
            username: friend.username,
            profile: friend.profile,
          },
        ]);
      });


      await axios
        .post(
          `https://oursos-backend-production.up.railway.app/news/${currentUser.languagepreference}`
        )
        .then((response) => {
          setNews(response.data);
        });

      let translatedData = JSON.parse(
        await AsyncStorage.getItem('translatedData') || ""
      );
      setTranslatedData(translatedData);

      setCurrentUser(currentUser);
      setUserLang(currentUser.languagepreference);
    })();
  }, []);
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
        style={[tw.style("flex-1 justify-center, w-full"), { resizeMode: "cover" }]}
      >
        <ScrollView style={tw.style(`p-4 mb-10`)}>
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
          <View style={tw.style("mt-2")}>
            <Pressable
              onPress={() => {
                router.push("/chat");
              }}
              style={tw.style(
                "flex-row items-center justify-start bg-white rounded-md px-4 py-2 shadow-md transform-translate-x-1/2"
              )}
            >
              <Image
                source={require("../../../assets/footerIcons/dark/Brain-Icon.png")}
                style={tw.style("ml-4 h-10 w-10")}
              />
              <Text
                style={tw.style("flex-1 text-xl font-semibold text-center")}
              >
                {userLang !== "en"
                  ? translatedData?.dashboard?.getAIHelp
                  : "Get AI Help"}
              </Text>
            </Pressable>
          </View>
          <Text style={tw.style(`text-2xl font-bold mt-2`)}>
            {" "}
            {userLang !== "en" ? translatedData?.dashboard?.news : "News"}
          </Text>
          <Suspense fallback={<CardLoading />}>
            <Slider
              onToggleSnackBar={onToggleSnackBar}
              data={news}
            />
          </Suspense>
          <View style={tw.style(`w-full`, `pt-0`, `pb-2`)}>
            <Text style={tw.style(`text-2xl font-bold mt-2 mb-2`)}>
              {" "}
              {userLang !== "en" ? translatedData?.dashboard?.map : "Map"}
            </Text>
            <Suspense fallback={<MapLoading />}>
              <View
                style={tw.style(
                  "border-solid border-[3] rounded-md border-[#001D3D] h-{300} w-full"
                )}
              >
                <MapComp
                  zoomEnabled={false}
                  pitchEnabled={false}
                  scrollEnabled={false}
                  toolbarEnabled={false}
                  height={300}
                  longTo={goToFriendLong}
                  latTo={goToFriendLat}
                />
              </View>
            </Suspense>
            <Pressable
              onPress={() => {
                router.push("/map");
              }}
              style={tw.style("absolute top-18 left-7")}
            >
              <View
                style={tw.style(
                  "bg-[#ffffff] bg-opacity-80 rounded-sm items-center justify-center w-[9.5] h-[9.5]"
                )}
              >
                <Image
                  source={require("../../../assets/mapui/Expand-Map.png")}
                  resizeMode={"contain"}
                  style={tw.style(`h-7 as18ect-1`)}
                />
              </View>
            </Pressable>
          </View>
          <View style={tw.style("bg-primary h-[17rem] mt-2")}>
            {friendsLocation?.length ?
              <Text style={tw.style(`text-2xl font-bold mt-2 mb-2`)}>
                {userLang !== "en" ? translatedData?.intro["friends-family"] : "Friends"}
              </Text>
              : <></>
            }
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              style={{ paddingVertical: 5 }}
              contentContainerStyle={{ justifyContent: "center" }}
            >
              {friendsLocation?.map((item: any, i: any) => {
                const displayData =
                  friendsLocation && friendsLocation[i]
                    ? friendsLocation[i]
                    : item;

                return (
                  <>
                    <Pressable
                      onPress={() => {
                        console.log(
                          "============friend's location===============",
                          "Latitude: ",
                          displayData.latitude,
                          "longitude: ",
                          displayData.longitude
                        );
                        setGoToFriendLat(displayData.latitude);
                        setGoToFriendLong(displayData.longitude);
                        console.log("TEST:", goToFriendLat, goToFriendLong);
                      }}
                      style={tw.style(
                        "items-center justify-center rounded-full px-2 mt-6 py-2  bottom-12"
                      )}
                    >
                      <Image
                        source={{ uri: displayData.profile }}
                        style={tw.style(
                          `w-25 h-25 rounded-full border-2 border-[#001D3D]`
                        )}
                      />
                      <Text
                        style={tw.style(`text-lg text-center text-black mt-2`)}
                      >
                        {displayData.username}
                      </Text>
                    </Pressable>
                  </>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
        <Snackbar
          style={[
            tw.style(`bg-white dark:bg-black rounded-t-lg`),
            Platform.OS === "android"
              ? tw.style(`bg-white dark:bg-black rounded-t-lg mb-19`)
              : tw.style(`bg-white dark:bg-black rounded-t-lg mb-15`),
          ]}
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
                `p-1 border-t border-r border-l border-[#001D3D] rounded-t-lg`
              )}
            >
              <Text>{snackData.snippet}</Text>
            </View>
            <View
              style={tw.style(`bg-[#001D3D] border-transparent rounded-b-lg`)}
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
