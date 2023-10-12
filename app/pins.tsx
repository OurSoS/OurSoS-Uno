import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";

export default function Pins() {
  return (
    <View>
      <View id="PinsContent" style={styles.pinsContent}>
          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/vancouver" }}
              style={styles.pinImage}
            />
            <Text style={styles.pinName}>Vancouver</Text>
          </View>

          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/kelowna" }}
              style={[styles.pinImage]}
            />
            <Text style={styles.pinName}>Kelowna</Text>
          </View>
          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/vancouver" }}
              style={styles.pinImage}
            />
            <Text style={styles.pinName}>Vancouver</Text>
          </View>

          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/kelowna" }}
              style={[{ width: 160, height: 100 }, styles.pinImage]}
            />
            <Text style={styles.pinName}>Kelowna</Text>
          </View>
          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/vancouver" }}
              style={styles.pinImage}
            />
            <Text style={styles.pinName}>Vancouver</Text>
          </View>

          <View id="Pin" style={styles.pin}>
            <Image
              source={{ uri: "https://loremflickr.com/320/240/kelowna" }}
              style={[{ width: 160, height: 100 }, styles.pinImage]}
            />
            <Text style={styles.pinName}>Kelowna</Text>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    position: "relative", // Change to "relative" if you don't need absolute positioning
    flex: 1,
    flexDirection: "row",
    
  },
  pinImage: {
    // width: '100%',
    height: 200,
    gap: 10,
    borderRadius: 15,
  },
  pinName: {
    color: "white", // Set text color to black
    fontSize: 24,
    position: "absolute", // Use "absolute" positioning
    bottom: 10, // Adjust the position as needed
    left: 10, // Adjust the position as needed
  },
  pinsHeader: {
    flex: 1,
    flexDirection: "row", 
    justifyContent: "space-between",
    margin: 10,
    height: 1,
  },
  pinsContent: {
    flexDirection: "row", 
    flexWrap: "wrap",
    margin: 10,
    gap: 20
  },
});
