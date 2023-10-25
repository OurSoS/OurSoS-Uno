import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, SafeAreaView } from "react-native";
import axios from "axios";
import IconTextBlock from "./components/molecules/iconTextBlock";
import { useRouter } from "expo-router";
import Footer from "./components/molecules/Footer";
import * as Location from "expo-location";
import MapComp from "./components/molecules/map-comp";
import { Searchbar, Text } from 'react-native-paper';
import tw from 'twrnc';

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

export default function App() {
  const router = useRouter();

  const [pins, setPins] = useState([]);
  const [alerts, setAlerts] = useState<alert[]>([]);

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");

  const mapRef = React.useRef<MapView>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query: string) => setSearchQuery(query);
  useEffect(() => {

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/alerts")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          1000
        );
      }
    })();
  }, []);

  return (
    <View style={tw.style(`h-full`, `relative`)}>
      <Text style={tw.style(`text-[2rem]`)}>Vancouver</Text>
      <Searchbar
        style={tw.style(`mb-4`)}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <MapComp height={430} />
      <Footer />
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