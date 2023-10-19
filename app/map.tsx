// import React, { useState } from "react";
// import { View, Text, Platform } from "react-native";
// import MapView, { Marker } from "react-native-maps"; // Import the map component (assuming you have installed it)

// export default function MapPage() {
//   const [mapState, setMapState] = useState({
//     latitude: 49.28346247273308,
//     longitude: -123.11525937277163,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   });

//   return (
//     <View>
//       <View>
//         <Text>Map</Text>
//       </View>
//         <MapView
//           style={{ flex: 1, height: 300 }} // Adjust the style as needed
//           initialRegion={{
//             latitude: mapState.latitude,
//             longitude: mapState.longitude,
//             latitudeDelta: mapState.latitudeDelta,
//             longitudeDelta: mapState.longitudeDelta,
//           }}
//         >
//         {/* <Marker coordinate={mapState} title={"jack"} /> */}
//         </MapView>
//     </View>
//   );
// }

import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, TextInput } from "react-native";
import axios from "axios";

export default function App() {
  const [pins, setPins] = useState([]);
  const [fakeAlerts, setFakeAlerts] = useState([
    {
      id: 1,
      category: "Traffic Update",
      location: "Downtown Vancouver",
      severity: "low",
      time: "1:23 PM 2023-10-02",
      latitude: 49.2827,
      longitude: -123.1207,
    },
    {
      id: 2,
      category: "Weather Alert",
      location: "North Vancouver",
      severity: "med",
      time: "2:45 PM 2023-10-02",
      latitude: 49.3197,
      longitude: -123.0722,
    },
    {
      id: 3,
      category: "Emergency Evacuation",
      location: "West End Vancouver",
      severity: "high",
      time: "3:30 PM 2023-10-02",
      latitude: 49.2879,
      longitude: -123.1377,
    },
    {
      id: 4,
      category: "Community Event",
      location: "Kitsilano Beach",
      severity: "low",
      time: "4:15 PM 2023-10-02",
      latitude: 49.2711,
      longitude: -123.1552,
    },
    {
      id: 5,
      category: "Power Outage",
      location: "Yaletown",
      severity: "med",
      time: "5:00 PM 2023-10-02",
      latitude: 49.2748,
      longitude: -123.1214,
    },
    {
      id: 6,
      category: "Fire Alert",
      location: "Gastown",
      severity: "high",
      time: "6:30 PM 2023-10-02",
      latitude: 49.2839,
      longitude: -123.1044,
    },
    {
      id: 7,
      category: "Construction Update",
      location: "East Vancouver",
      severity: "low",
      time: "7:45 PM 2023-10-02",
      latitude: 49.2783,
      longitude: -123.0695,
    },
    {
      id: 8,
      category: "Public Health Advisory",
      location: "South Vancouver",
      severity: "med",
      time: "8:15 PM 2023-10-02",
      latitude: 49.2029,
      longitude: -123.1306,
    },
    {
      id: 9,
      category: "Road Closure",
      location: "Commercial Drive",
      severity: "high",
      time: "9:10 PM 2023-10-02",
      latitude: 49.2704,
      longitude: -123.0693,
    },
    {
      id: 10,
      category: "Community Event",
      location: "Stanley Park",
      severity: "low",
      time: "10:20 PM 2023-10-02",
      latitude: 49.3027,
      longitude: -123.1417,
    },
    {
      id: 11,
      category: "Traffic Update",
      location: "Granville Street",
      severity: "med",
      time: "11:05 PM 2023-10-02",
      latitude: 49.282,
      longitude: -123.1211,
    },
    {
      id: 12,
      category: "Emergency Evacuation",
      location: "Coal Harbour",
      severity: "high",
      time: "11:45 PM 2023-10-02",
      latitude: 49.2892,
      longitude: -123.1216,
    },
  ]);

  useEffect(() => {
    // axios
    // .get("https://oursos-backend-production.up.railway.app/news")
    // .then((response) => {
    //   // setNews(response.data);
    //   console.log(response.data);
    // })
    // .catch((error) => console.error(error));
  }, []);

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
        {fakeAlerts &&
          fakeAlerts.map((a, i) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: a.latitude,
                  longitude: a.longitude,
                }}
                title={a.category + " - " + a.location + " - " + a.severity}
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
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 3, // This adds an elevation for shadow on Android
  },
});
