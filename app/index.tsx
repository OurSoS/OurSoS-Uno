import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AtomIcon from "./components/atoms/icon";
import Header from "./components/molecules/header";


export default function App() {
  return (
    <View style={styles.container}>
      <AtomIcon icon="home" />
      <StatusBar style="auto" />
      <Header
              title="OurSOS"
              hasBackButton={true}
              hasToggleSwitch={false}
              hasLocation={false}
              hasSearchbar={false}
              hasLogo={true}

      ></Header>
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
