import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import tw from "twrnc";

import { useRouter } from "expo-router";

import * as Location from "expo-location";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type MapCompProps = {
  height?: number;
};

type alert = {
  id: number;
  message: string;
  category: string;
  latitude: Float;
  longitude: Float;
  radius: Float;
  time: string;
  severity: string;
};

type earthquake = {
  geometry: {
    coordinates: [number, number, number];
    type: string;
  };
  id: string;
  properties: {
    alert: null | string;
    cdi: null | number;
    code: string;
    detail: string;
    dmin: null | number;
    felt: null | number;
    gap: null | number;
    ids: string;
    mag: number;
    magType: string;
    mmi: null | number;
    net: string;
    nst: null | number;
    place: string;
    rms: number;
    sig: number;
    sources: string;
    status: string;
    time: number;
    title: string;
    tsunami: number;
    type: string;
    types: string;
    tz: null | number;
    updated: number;
    url: string;
  };
  type: string;
};

type fire = {};

export default function MapComp({ height }: MapCompProps) {
  const router = useRouter();

  const [pins, setPins] = useState([]);
  const [alerts, setAlerts] = useState<alert[]>([]);
  const [earthquakes, setEarthquakes] = useState<earthquake[]>([]);
  const [fires, setFires] = useState<any>([]);
  const [tsunamis, setTsunamis] = useState<any>([]);

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");

  const mapRef = React.useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);
    })();
  }, []);
  //GET USER GENERATED ALERTS
  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/alerts")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);
  //GET EARTHQUAKE ALERTS
  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/earthquakes    ")
      .then((response) => {
        
        setEarthquakes(response.data.features);
      })
      .then(() => {
        setTsunamis(earthquakes.filter(e => {
               return e.properties.tsunami !== 0;
        }));
        console.log(tsunamis)
      })
      .catch((error) => console.error(error));
  }, []);
  //GET FIRE ALERTS
  useEffect(() => {
    axios
      .get("https://oursos-backend-production.up.railway.app/fires")
      .then((response) => {
        setFires(response.data);
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
    <View style={tw.style(`flex`)}>
      <MapView
        ref={mapRef}
        style={{
          ...styles.map,
          height: height !== undefined ? height : "100%",
          borderRadius: 10,
        }}
        initialRegion={{
          latitude: location?.coords.latitude || 40,
          longitude: location?.coords.longitude || -123.11525937277163,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* USER GENERATED ALERTS */}
        {alerts &&
          alerts.map((a, i) => {
            return (
              <Marker
                key={i}
                pinColor="blue"
                coordinate={{
                  latitude: a.latitude,
                  longitude: a.longitude,
                }}
                title={a.category + " - " + a.severity + "\n" + a.message}
              />
            );
          })}
        {/* EARTHQUAKE ALERTS */}
        {earthquakes &&
          earthquakes.map((a: any, i: number) => {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: a.geometry.coordinates[1],
                  longitude: a.geometry.coordinates[0],
                }}
              />
            );
          })}
        {/* FIRE ALERTS */}
        {fires &&
          fires.map((a: any, i: number) => {
            return (
              <Marker
                key={i}
                pinColor="orange"
                coordinate={{
                  latitude: parseFloat(a.latitude),
                  longitude: parseFloat(a.longitude),
                }}
              />
            );
          })}
          {/* TSUNAMI ALERTS */}
          {tsunamis &&
          tsunamis?.map((a: any, i: number) => {
            return (
              <Marker
                key={i}
                pinColor="pink"
                coordinate={{
                  latitude: parseFloat(a.latitude),
                  longitude: parseFloat(a.longitude),
                }}
              />
            );
          })} 
          

        {/* if users location is set on, use location of user device, if not then dont show marker */}
        {/* MY MARKER */}
        {location && (
          <Marker
            coordinate={{
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            }}
            title={"You are here"}
          />
        )}
        <View>
          <Text>TESTTESTETS</Text>
        </View>
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
