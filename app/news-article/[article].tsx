import { Text, View, Image, StyleSheet, Button, ScrollView } from "react-native";
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

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/news")
      .then((response) => {
        // Find the news article that matches the article number
        const foundNews = response.data.find(
          (newsItem: newsItemType) => newsItem.position.toString() === articleNumber
        );

        if (foundNews) {
          setNews(foundNews);
        }
      })
      .catch((error) => console.error(error));
  }, [articleNumber]);

  return (
    <>
      <ScrollView style={s.container}>
        <Button onPress={() => router.back()} title="Go Back" />
        <Text style={s.title}>{news?.title}</Text>
        <Text style={s.date}>{news?.source} - {news?.date}</Text>
        <Image style={s.image} source={{ uri: news?.thumbnail }} />
        <Link href={news?.link || ""}>
          <Text style={s.caption}>Read the full article here</Text>
        </Link>
        {/* TODO: we need to web scrape more body content here, that will be copyright content though so maybe AI can change the wording? no clue */}
        <Text style={s.bodyText}>{news?.snippet}</Text>
        {/* <Text>{articleNumber}</Text> */}
      </ScrollView>
    </>
  );
}

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
    height: 300,     // Fixed height of 300 at mobile, for desktop we should increase..
    resizeMode: 'contain',
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
  }
});

