import { View, TextInput, ScrollView, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import tw from "twrnc";
import axios from "axios";
import Slider from "../molecules/slider";
import { Searchbar } from "react-native-paper";
import MapComp from "../molecules/map-comp";
import { Avatar, Button, Card, Text, Snackbar } from "react-native-paper";
import { router } from "expo-router";
import Footer from "../molecules/Footer";
import ImageText from "../molecules/image-text-block";

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

        const translateResponse = await fetch(
          "https://oursos-backend-production.up.railway.app/translateobject",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              translateObject: translationData,
              lang: userLang,
            }),
          }
        );
        if (!translateResponse.ok)
          throw new Error("Network response was not ok.");
        const translatedNews = await translateResponse.json();
        setTranslatedNews(translatedNews);
        console.log("adsfsdafasdfsad", translatedNews);
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
      <ScrollView style={tw.style(`px-4`)}>
        <Text style={tw.style(`text-[1.75rem]`, `mb-8`, `py-4`)}>
          Dashboard
        </Text>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Slider
          onToggleSnackBar={onToggleSnackBar}
          data={news}
          translatedData={translatedNews}
        />
        <MapComp height={300} />
        <View style={tw.style(`h-[300px]`, `w-full`, `py-4`)}>
          <View
            style={tw.style(
              `flex`,
              `flex-row`,
              `justify-between`,
              `w-full`,
              `items-center`
            )}
          >
            <Text style={tw.style(`text-[1.5rem]`)}>Pins</Text>
            <Button>View More</Button>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            style={{ padding: 10 }}
            contentContainerStyle={{ justifyContent: "center" }}
          >
            <View style={tw.style(`mb-[60px]`)}>
              {pins?.map((pin: any, i: number) => {
                let text = "Vancouver";
                let imgUrl =
                  "https://www.planetware.com/wpimages/2020/03/canada-best-cities-vancouver-british-columbia.jpg";
                return (
                  <ImageText
                    key={i}
                    text={text}
                    style="rounded"
                    imageUrl={imgUrl}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={tw.style(`h-[300px]`, `w-full`, `pt-0`, `pb-15`)}>
          <View
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
          </View>
          <ScrollView
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
            {/* </View> */}
          </ScrollView>
        </View>
      </ScrollView>
      <Footer />
      <Snackbar
        style={tw.style(`bg-white`, `rounded-t-lg`)}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Read More",
          onPress: () => {
            router.push(snackData.link);
          },
        }}
      >
        <Text>{snackData.snippet}</Text>
        <Text>{snackData.source}</Text>
      </Snackbar>
    </View>
  );
}
