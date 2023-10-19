import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TextInput, Button, Image } from "react-native";
import axios from "axios";
// import IconTextBlock from "./components/molecules/iconTextBlock";
import { useRouter } from "expo-router";
import Footer from "../components/Footer";

type markerLocation = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

type alert = {
  id: number;
  message: string;
  category: string;
  latitude: string;
  longitude: string;
  radius: string;
  time: string;
  severity: string;
};

import * as Location from 'expo-location';

export default function App() {
  const router = useRouter();

  const [location, setLocation] = useState<Location.LocationObject>();
  const [myLocationState, setMyLocationState] = useState<markerLocation>();
  const [errorMsg, setErrorMsg] = useState("");

  const [pins, setPins] = useState([]);
  const [alerts, setAlerts] = useState<alert[]>([]);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(typeof(location.coords.latitude));
      setMyLocationState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })();
  }, []);


  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/alerts")
      .then((response) => {
        setAlerts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  // TODO: update these with user location
  const [mapState, setMapState] = useState({
    latitude: 49.28346247273308,
    longitude: -123.11525937277163,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <>
      <View style={styles.container}>
        <Button onPress={() => router.back()} title="Go Back" />
        <View style={{ padding: 15 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 10,
            }}
          >
            <Text style={{ fontSize: 22 }}>Vancouver</Text>
            <Text
              style={{
                backgroundColor: "lightgrey",
                paddingHorizontal: 40,
                paddingVertical: 10,
              }}
            >
              logo
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Search locations and friends"
              style={styles.searchInput}
            ></TextInput>
          </View>
        </View>

        <MapView
          style={styles.map}
          initialRegion={myLocationState}>
          {alerts &&
            alerts.map((a, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: parseFloat(a.latitude),
                    longitude: parseFloat(a.longitude),
                  }}
                  title={a.category}
                  description={a.message + "\n" + a.severity}
                >
                  <Image
                    source={require("../assets/map/markerPinIcon.png")}
                    style={{ height: 30, width: 30 }}
                  />
                </Marker>
              );
            })}

          {/* MY MARKER */}
          <Marker coordinate={myLocationState as any} title={"jack"}>
            {/* This is you and your location */}
            <Image
              source={require("../assets/adaptive-icon.png")}
              style={{
                height: 30,
                width: 30,
                backgroundColor: "black",
                borderRadius: 50,
              }}
            />
          </Marker>
        </MapView>
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  searchInput: {
    borderRadius: 62,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginRight: 10,
  },
});
