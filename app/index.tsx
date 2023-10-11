import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {Link} from "expo-router"

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/news">
        <Text>Views News Feed</Text>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
