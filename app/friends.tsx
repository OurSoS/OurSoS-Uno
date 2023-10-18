import { View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import { styles } from "../app/styles/newsStyles";
import Friend from "../components/friend";

export default function friends() {
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
    <>
      <TextInput
        placeholder="Search for friends"
        style={styles.searchInput}
      ></TextInput>

      <View style={s.friendsContainer}>
        {friends.map((friend, i) => {
          return <Friend name={friend.name} image={friend.image} key={i} />;
        })}
      </View>
    </>
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
