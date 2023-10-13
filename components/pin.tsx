import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

interface PinProps {
  imageUrl: string;
  pinName: string;
}

const Pin: React.FC<PinProps> = ({ imageUrl, pinName }) => {
  return (
    <View style={styles.pin}>
      <Image source={{ uri: imageUrl }} style={styles.pinImage} />
      <Text style={styles.pinName}>{pinName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: 200, // Set the width to 50% to fit 2 items in a row
    margin: 10,
    backgroundColor: "white",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    elevation: 3,
  },
  pinImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  pinName: {
    color: "black",
    fontSize: 24,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

export default Pin;
