import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

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
        const renderItem = ({ item }) => (
          <View style={styles.item}>
            <View style={styles.avatarContainer}>
              <Image style={styles.avatar} source={item.image} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        );


        const listHeaderComponent = () => {
                return <Text style={styles.listHeadline}>Friends</Text>;
              };
              
              const itemSeparatorComponent = () => {
                return <View style={styles.separator} />;
              };
              
              return (
                <FlatList
                  ListHeaderComponent={listHeaderComponent}
                  ListHeaderComponentStyle={styles.listHeader}
                  data={friends}
                  renderItem={renderItem}
                  ItemSeparatorComponent={itemSeparatorComponent}
                  keyExtractor={(item) => item.id.toString()}
                />
              );
              
export default FriendsList;
