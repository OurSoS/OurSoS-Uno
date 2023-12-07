import { StatusBar } from "expo-status-bar";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	Pressable,
} from "react-native";
// import * as MapImage from "../../../assets/Intro/Map.png";
import React, { useState, useEffect } from "react";
import { useFonts, NotoSans_400Regular } from "@expo-google-fonts/dev";
const backgroundImage = {
	uri: "../../../assets/Intro/Map.png",
};

export default function IntroLayout({
	children,
}: {
	children: React.ReactNode[] | React.ReactNode;
}) {
	let [fontsLoaded] = useFonts({
		NotoSans_400Regular,
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<View style={styles.container}>
			<ImageBackground source={backgroundImage} style={styles.image} />
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		width: "100%",
		paddingHorizontal: 18,
		paddingVertical: 10,
		height: "90%",
		maxWidth: "85%",
		borderRadius: 10,
		fontFamily: "NotoSans_400Regular",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "gray",
	},
	image: {
		// flex: 1,
		// justifyContent: "center",
		objectFit: "cover",
		// objectPos
		width: "100%",
		height: "100%",
		top: 0,
		position: "absolute",
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "black",
	},
});
