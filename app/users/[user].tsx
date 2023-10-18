import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

type coordinate = {
  lat: number;
  lng: number;
};

type userType = {
  id: number;
  username: string;
  locations: coordinate[];
  languagepreference: string;
  friends: number[];
};

export default function User() {
  const router = useRouter();
  const { user } = useLocalSearchParams();

  const [u, setU] = useState<userType | undefined>();

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/users")
      .then((response) => {
        // Find the news article that matches the article number
        const foundUser = response.data.find(
          (u: userType) => u.id.toString() === user
        );

        if (foundUser) {
          setU(foundUser);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <View style={s.container}>
        <Button onPress={() => router.back()} title="Go Back" />
        <Text style={s.title}>{u?.username}</Text>
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
  },
});
