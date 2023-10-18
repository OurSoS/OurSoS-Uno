import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps"; // Import the map component (assuming you have installed it)

export default function MapPage() {
  const [mapState, setMapState] = useState({
    latitude: 49.28346247273308,
    longitude: -123.11525937277163,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View>
      <View>
        <Text>Map</Text>
      </View>
    
      {Platform.OS === "ios" || Platform.OS === "android" ? (
        <MapView
          style={{ flex: 1, height: 300 }} // Adjust the style as needed
          initialRegion={{
            latitude: mapState.latitude,
            longitude: mapState.longitude,
            latitudeDelta: mapState.latitudeDelta,
            longitudeDelta: mapState.longitudeDelta,
          }}
        >
          <Marker coordinate={mapState} title={"jack"} />
        </MapView>
      ) : (
        <Text>The map does not work on Web yet... Sorry!</Text>
      )}
    </View>
  );
}
