import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
interface Friend {
  id: number;
  name: string;
  image: any;
}

const friends = [
  { id: 1, name: "Hani", image: require("../../../assets/avatars/Avatar.png") },
  { id: 2, name: "Moh", image: require("../../../assets/avatars/Avatar.png") },
  {
    id: 3,
    name: "Paarth",
    image: require("../../../assets/avatars/Avatar.png"),
  },
  { id: 4, name: "Tony", image: require("../../../assets/avatars/Avatar.png") },
  { id: 5, name: "Jack", image: require("../../../assets/avatars/Avatar.png") },
  {
    id: 6,
    name: "Neema",
    image: require("../../../assets/avatars/Avatar.png"),
  },
];

const FriendsList = () => {
  const renderFriend = (friend: Friend) => (
    <View key={friend.id.toString()} style={styles.item}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={friend.image} />
      </View>
      <Text style={styles.name}>{friend.name}</Text>
    </View>
  );

  const listHeaderComponent = () => {
    return <Text style={styles.listHeadline}>Friends</Text>;
  };

  const itemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View>
      <Text style={styles.listHeadline}>Friends</Text>
      <ScrollView>
        {friends.map((friend, index) => (
          <View key={friend.id.toString()}>
            {renderFriend(friend)}
            {index < friends.length - 1 && itemSeparatorComponent()}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF", // Assuming you want a white background
  },
  listHeadline: {
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    backgroundColor: "#FFF", // Assuming you want a white background for each item
  },
  avatarContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 50, // A radius of half of the size to make it perfectly round
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13, // Added margin to separate the avatar from the name
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 121,
  },
  name: {
    fontWeight: "500",
    fontSize: 24,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#B4B4B4",
  },
});

export default FriendsList;
