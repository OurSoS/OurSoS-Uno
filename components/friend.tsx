import { View, Text, Image } from "react-native";
import { styles } from "../app/styles/newsStyles";

export default function friend(friend: { name: string; image: string }) {
  return (
    <>
      <View id="Friend" style={styles.friend}>
        <Image source={{ uri: friend.image }} style={styles.FriendImage} />
        <Text style={styles.FriendName}>{friend.name}</Text>
      </View>
    </>
  );
}
