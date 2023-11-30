import React from "react";
import { View, Text, StyleSheet} from "react-native";

export default function Loading() {
  // Define your animation logic here using Animated API

  return (
    <View>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.imageContainer}></View>
          <View style={styles.textContainer}>
            <Text style={styles.title}></Text>
            <Text style={styles.description}></Text>
            <Text style={styles.smallText}></Text>
            <View style={styles.buttonContainer}>
              <View style={styles.greenButton}></View>
              <View style={styles.blueButton}></View>
              <View style={styles.grayButton}></View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // Add other styles to mimic your CSS styles
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#ddd",
    height: 100,
    borderRadius: 10,
    // Add other styles
  },
  textContainer: {
    flex: 2,
    paddingLeft: 16,
    // Add other styles
  },
  title: {
    height: 24,
    backgroundColor: "#eee",
    width: "75%",
    marginBottom: 8,
    // Add other styles
  },
  description: {
    height: 16,
    backgroundColor: "#eee",
    width: "50%",
    marginBottom: 4,
    // Add other styles
  },
  smallText: {
    height: 16,
    backgroundColor: "#eee",
    width: "25%",
    marginBottom: 4,
    // Add other styles
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    // Add other styles
  },
  greenButton: {
    backgroundColor: "#aaa",
    width: "25%",
    height: 16,
    // Add other styles
  },
  blueButton: {
    backgroundColor: "#aaa",
    width: "25%",
    height: 16,
    // Add other styles
  },
  grayButton: {
    backgroundColor: "#aaa",
    width: "25%",
    height: 16,
    // Add other styles
  },
});
