import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

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
      <View style={s.container}>
        <Button onPress={() => router.back()} title="Go Back" />
        <Text style={s.title}>{news?.title}</Text>
        <Text style={s.date}>{news?.source} - {news?.date}</Text>
        <Image style={s.image} source={{ uri: news?.thumbnail }} />
        <Link href={news?.link || ""}>
          <Text style={s.caption}>Read the full article here</Text>
        </Link>
        {/* <Text style={s.source} >{news?.source}</Text> */}
        {/* TODO: we need to web scrape more body content here, that will be copyright content though so maybe AI can change the wording? no clue */}
        <Text style={s.bodyText}>{news?.snippet}</Text>
        
        
        
        <Text>{articleNumber}</Text>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  backbutton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    padding:40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: "100%", // Take maximum width
    height: 300,     // Fixed height of 300 at mobile, for desktop we should increase..
    resizeMode: 'contain',
  },
  date: {
    fontSize: 12,
  },
  caption: {
    fontSize: 12,
  },
  source: {
    fontSize: 12,
  },
  bodyText: {
    fontSize: 16,
  }
});

