import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
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

export default function Article() {
  const router = useRouter();
  const { article } = useLocalSearchParams();

  // Ensure that article is always treated as a number for matching the position.
  const articleNumber = article;

  const [news, setNews] = useState<newsItemType | undefined>();
  const [userLang, setUserLang] = useState("en");

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/users/1")
      .then((user) => {
        setUserLang(user.data.languagepreference);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/news")
      .then((response) => {
        const foundNews = response.data.find(
          (newsItem: newsItemType) =>
            newsItem.position.toString() === articleNumber
        );

        if (foundNews) {
          const data = {
            text: `${foundNews.title}. ${foundNews.snippet}`,
            lang: userLang,
          };

          axios
            .post(
              "https://oursos-backend-production.up.railway.app/translate",
              data
            )
            .then((translation) => {
              const [translatedTitle, translatedSnippet] =
                translation.data.split(". ");
              setNews({
                ...foundNews,
                title: translatedTitle,
                snippet: translatedSnippet,
              });
            })
            .catch((error) =>
              console.error("Error translating the news:", error)
            );
        }
      })
      .catch((error) => console.error("Error fetching the news:", error));
  }, [articleNumber, userLang]);

  return (
    <>
      <ScrollView style={s.container}>
        <Button onPress={() => router.back()} title="Go Back" />
        <Text style={s.title}>{news?.title}</Text>
        <Text style={s.date}>
          {news?.source} - {news?.date}
        </Text>
        <Image style={s.image} source={{ uri: news?.thumbnail }} />
        <Link href={news?.link || ""}>
          <Text style={s.caption}>Read the full article here</Text>
        </Link>
        <Text style={s.bodyText}>{news?.snippet}</Text>
      </ScrollView>
    </>
  );
}

// ... (Styles remain unchanged)

const s = StyleSheet.create({
  backbutton: {
    position: "absolute",
    top: 10,
    left: 10,
    // marginBottom: 10,
  },
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%", // Take maximum width
    height: 300, // Fixed height of 300 at mobile, for desktop we should increase..
    resizeMode: "contain",
    marginVertical: 10,
  },
  date: {
    fontSize: 12,
  },
  caption: {
    fontSize: 12,
    color: "blue",
  },
  source: {
    fontSize: 12,
  },
  bodyText: {
    marginTop: 10,
    fontSize: 16,
  },
});
