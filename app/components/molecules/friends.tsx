import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
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
      <Image style={styles.avatar} source={friend.image} />
      <Text style={styles.name}>{friend.name}</Text>
      <Icon name="chevron-right" size={30} style={styles.iconStyle} />
    </View>
  );

  return (
    <View style={styles.cardBackground}>
      <Text style={styles.listHeadline}>Friends</Text>
      <ScrollView>
        {friends.map((friend, index) => (
          <View key={friend.id.toString()}>
            {renderFriend(friend)}
            {index < friends.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBackground: {
    width: "95%",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 5,
    paddingTop: 20,
    paddingHorizontal: 40,
    marginTop: -150,
    marginBottom: 150,
    alignSelf: "center",
  },
  listHeadline: {
    color: "#333",
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  scrollViewStyle: {
    width: "100%",
  },
  friendContainer: {
    width: "100%",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    width: "100%",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 25,
    marginRight: 20,
  },
  name: {
    fontWeight: "500",
    fontSize: 24, // Reduced font size for the name
  },
  iconStyle: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -1,
    color: "#003566",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#B4B4B4",
    marginTop: 13,
  },
});

export default FriendsList;
