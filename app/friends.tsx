import { View, StyleSheet, TextInput, Button } from "react-native";
import { useState, useContext } from "react";
import { styles } from "../app/styles/newsStyles";
import Friend from "../components/friend";
import {useRouter } from "expo-router";
import { StaticTextContext } from "./context/language-context";

export default function friends() {
  const router = useRouter();

  const [translatedStaticContent, setTranslatedStaticContent] = useContext(StaticTextContext);

  const [friends, setFriends] = useState([
    { name: "John Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "Jane Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
    { name: "James Doe", image: "https://i.imgur.com/0LKZQYM.png" },
  ]);

  return (
    <View>
      <Button onPress={() => router.back()} title={translatedStaticContent["button-text"]["back-button"]} />
      <TextInput
        placeholder={translatedStaticContent.friends["search-placeholder"]}
        style={styles.searchInput}
      ></TextInput>

      <View style={s.friendsContainer}>
        {friends.map((friend, i) => {
          return <Friend name={friend.name} image={friend.image} key={i} />;
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  friendsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
});
