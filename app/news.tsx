import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function News() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.heading2}>My Dashboard</Text>
      <TextInput placeholder="Search locations and friends" style={styles.searchInput}></TextInput>
      
      <View>
        <View>
            {/* <Image /> */}
            <Text>Emergency</Text>
            <Text>Kelowna Wildfire Live Updates</Text>
        </View>
      </View>
      <View>
        {/* map */}
      </View>
      <View>
        <View>
            <Text>Pins</Text>
            <Text>View More</Text>
        </View>
        <View>
            <View>
                {/* <Image /> */}
                <Text>Location</Text>
            </View>
        </View>
      </View>
      <View>
        <View>
            <Text>Friends</Text>
            <Text>View More</Text>
        </View>
        <View>
            <View>
                {/* <Image /> */}
                <Text>Name</Text>
            </View>
        </View>
      </View>
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
  searchInput: {
    borderRadius: 62,
    backgroundColor: 'white', // Use 'white' for #FFF
    // Dashboard/Card
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    elevation: 3, // This adds an elevation for shadow on Android
  },
  heading2: {
    color: '#252525', // Use '#252525' for var(--Black, #252525)
    fontFamily: 'Noto Sans',
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '500', // Use '500' for font-weight: 500
    lineHeight: 1, // You can set 'normal' or a specific value for line-height
  },
});
