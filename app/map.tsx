import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TextInput } from "react-native";
import axios from "axios";


type alert = {
  id: number;
  message: string;
  category: string;
  latitude: string;
  longitude: string;
  radius: string;
  time: string;
  severity: string;
}


export default function App() {
  const [pins, setPins] = useState([]);
  const [alerts, setAlerts] = useState<alert[]>([]);

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
    <View style={styles.container}>
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
        initialRegion={{
          latitude: mapState.latitude,
          longitude: mapState.longitude,
          latitudeDelta: mapState.latitudeDelta,
          longitudeDelta: mapState.longitudeDelta,
        }}
      >
        {alerts &&
          alerts.map((a, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: parseFloat(a.latitude),
                  longitude: parseFloat(a.longitude),
                }}
              title={a.category + " - " + a.severity+'\n'+a.message}
              />
            );
          })}

        {/* MY MARKER */}
        <Marker coordinate={mapState} title={"jack"} />
      </MapView>
    </View>
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
    backgroundColor: "white", // Use 'white' for #FFF
    // Dashboard/Card
    
    padding: 10,
    marginBottom: 0,
    marginHorizontal: 10,
    elevation: 3, // This adds an elevation for shadow on Android
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 10,
    marginRight: 10,
  },
});
