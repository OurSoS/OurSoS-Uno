import React from "react";
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
import FriendsList from "../molecules/friends";
import tw from "../../../lib/tailwind";
import publicIP from "react-native-public-ip";
import { getDeviceId } from "../../chat";

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
  const [friendsLocation, setFriendsLocation] = useState<any>([]);
  const [goToFriendLat, setGoToFriendLat] = useState(0)
  const [goToFriendLong, setGoToFriendLong] = useState(0)


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

  useEffect(() => {
    (async () => {
      await fetch(
        `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
      )
        .then((response) => response.json())
        .then(async (response) => {
          const res = await fetch(
            `https://oursos-backend-production.up.railway.app/getfriendsforuser/${response.id}`
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
        });
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
        style={[tw.style("flex-1 justify-center"), { resizeMode: "cover" }]}
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
                "flex-row items-center justify-start bg-white rounded-md px-4 py-2 shadow-md transform -translate-x-1/2"
              )}
            >
              <Image
                source={require("../../../assets/footerIcons/dark/Brain-Icon.png")}
                style={tw.style("ml-4 h-10 w-10")}
              />
              <Text
                style={tw.style("flex-1 text-xl font-semibold text-center")}
              >
                Get AI Help
              </Text>
            </Pressable>
          </View>
          <Text style={tw.style(`text-2xl font-bold mt-2`)}>NEWS</Text>
          <Slider
            onToggleSnackBar={onToggleSnackBar}
            data={news}
            translatedData={translatedNews}
          />
          <View style={tw.style(`w-full`, `pt-0`, `pb-2`)}>
            <Text style={tw.style(`text-2xl font-bold mt-2 mb-2`)}>MAP</Text>
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
                longTo={goToFriendLong}
                latTo={goToFriendLat}
              />
            </View>
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
            <Text style={tw.style(`text-2xl font-bold mt-2 mb-2`)}>
              Friends
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              style={{ paddingVertical: 5 }}
              contentContainerStyle={{ justifyContent: "center" }}
            >
              {friendsLocation.map((item: any, i: any) => {
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
                          displayData.longitude,
                          );
                        setGoToFriendLat(displayData.latitude)
                        setGoToFriendLong(displayData.longitude)   
                        console.log("TEST:",goToFriendLat, goToFriendLong)                       
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
