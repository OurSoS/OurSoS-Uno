import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";
import tw from "twrnc";
import * as Location from "expo-location";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

import debounce from "lodash.debounce";

type MapCompProps = {
  height?: number;
  buttons?: boolean;
};

type LocationData = {
  latitude: number;
  longitude: number;
};

type alert = {
  id?: number;
  message?: string;
  category: string;
  latitude: Float;
  longitude: Float;
  radius?: Float;
  time?: string;
  severity?: string;
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

const handleNewPin = () => {
  console.log("new pin");
};

export default function MapComp({ height, buttons }: MapCompProps) {
  const [CustomAlertModel, setCustomAlertModel] = useState(false);
  const [draggableMarker, setDraggableMarker] = useState<alert | null>(null);

  const [alerts, setAlerts] = useState<alert[]>([]);
  const [earthquakes, setEarthquakes] = useState<earthquake[]>([]);
  const [fires, setFires] = useState<any>([]);
  const [tsunamis, setTsunamis] = useState<any>([]);

  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [friendsLocation, setFriendsLocation] = useState<any>([]);

  const mapRef = React.useRef<MapView>(null);

  const [visibleAlerts, setVisibleAlerts] = useState<alert[]>([]);
  const [visibleEarthquakes, setVisibleEarthquakes] = useState<earthquake[]>(
    []
  );
  const [visibleFires, setVisibleFires] = useState<any>([]);
  const [visibleTsunamis, setVisibleTsunamis] = useState<any>([]);

  const reportFireAlert = (locationData: LocationData) => {
    axios
      .post("https://oursos-backend-production.up.railway.app/reportalert", {
        message: "Fire Alert",
        category: "Fire",
        severity: "High",
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        radius: 100.0,
      })
      .then(async (response) => {
        // Handle response or update state as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error appropriately
      });
  };

  const handleRegionChange = debounce((region) => {
    // Filter alerts, earthquakes, fires, and tsunamis based on the visible region
    const visibleAlerts = alerts.filter((a) => {
      // Check if the alert's latitude and longitude are within the visible region
      return (
        a.latitude >= region.latitude - region.latitudeDelta / 2 &&
        a.latitude <= region.latitude + region.latitudeDelta / 2 &&
        a.longitude >= region.longitude - region.longitudeDelta / 2 &&
        a.longitude <= region.longitude + region.longitudeDelta / 2
      );
    });

    const visibleEarthquakes = earthquakes.filter((a) => {
      // Check if the earthquake's latitude and longitude are within the visible region
      return (
        a.geometry.coordinates[1] >=
          region.latitude - region.latitudeDelta / 2 &&
        a.geometry.coordinates[1] <=
          region.latitude + region.latitudeDelta / 2 &&
        a.geometry.coordinates[0] >=
          region.longitude - region.longitudeDelta / 2 &&
        a.geometry.coordinates[0] <=
          region.longitude + region.longitudeDelta / 2
      );
    });

    const visibleFires = fires.filter((a: any) => {
      // Check if the fire's latitude and longitude are within the visible region
      return (
        parseFloat(a.latitude) >= region.latitude - region.latitudeDelta / 2 &&
        parseFloat(a.latitude) <= region.latitude + region.latitudeDelta / 2 &&
        parseFloat(a.longitude) >=
          region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.longitude) <= region.longitude + region.longitudeDelta / 2
      );
    });

    const visibleTsunamis = tsunamis.filter((a: any) => {
      // Check if the tsunami's latitude and longitude are within the visible region
      return (
        parseFloat(a.latitude) >= region.latitude - region.latitudeDelta / 2 &&
        parseFloat(a.latitude) <= region.latitude + region.latitudeDelta / 2 &&
        parseFloat(a.longitude) >=
          region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.longitude) <= region.longitude + region.longitudeDelta / 2
      );
    });

    // Update the state variables with the filtered data
    setVisibleAlerts(visibleAlerts);
    setVisibleEarthquakes(visibleEarthquakes);
    setVisibleFires(visibleFires);
    setVisibleTsunamis(visibleTsunamis);
  }, 400); // Adjust the delay (in milliseconds) as needed

  const retrieveAlerts = async () => {
    await axios
      .get("https://oursos-backend-production.up.railway.app/alerts")
      .then((response) => {
        setAlerts(response.data);
      })
      .catch((error) => console.error(error));
    await axios
      .get("https://oursos-backend-production.up.railway.app/earthquakes")
      .then((response) => {
        setEarthquakes(response.data.features);
      })
      .then(() => {
        setTsunamis(
          earthquakes.filter((e) => {
            return e.properties.tsunami !== 0;
          })
        );
        console.log(tsunamis);
      })
      .catch((error) => console.error(error));
    await axios
      .get("https://oursos-backend-production.up.railway.app/fires")
      .then((response) => {
        setFires(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    (async () => {
      await axios
        .get("https://oursos-backend-production.up.railway.app/earthquakes")
        .then((response) => {
          setEarthquakes(response.data.features);
        })
        .then(() => {
          setTsunamis(
            earthquakes.filter((e) => {
              return e.properties.tsunami !== 0;
            })
          );
          console.log(tsunamis);
        })
        .catch((error) => console.error(error));
      //GET FIRE ALERTS
      await axios
        .get("https://oursos-backend-production.up.railway.app/fires")
        .then((response) => {
          setFires(response.data);
        })
        .catch((error) => console.error(error));

      await axios
        .get("https://oursos-backend-production.up.railway.app/alerts")
        .then((response) => {
          setAlerts(response.data);
        })
        .catch((error) => console.error(error));
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // console.log(location);

      await axios
        .get("https://oursos-backend-production.up.railway.app/alerts")
        .then((response) => {
          setAlerts(response.data);
        })
        .catch((error) => console.error(error));

      await axios
        .get("https://oursos-backend-production.up.railway.app/users/1")
        .then((response) => {
          return response.data.friends;
        })
        .then((response) => {
          response.map((friend: any) => {
            axios
              .get(
                `https://oursos-backend-production.up.railway.app/users/${friend}`
              )
              .then((response) => {
                let long = response.data.longitude;
                let lat = response.data.latitude;
                setFriendsLocation((friendsLocation: any) => [
                  ...friendsLocation,
                  { longitude: long, latitude: lat },
                ]);
              });
          });
        })
        .catch((error) => console.error(error));
    })();

    retrieveAlerts();
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
        // @ts-ignore
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

  const handleReportAlert = () => {
    setCustomAlertModel(true);
    console.log("report alert");
  };

  const handleToggleMyLocation = () => {
    console.log("toggle my location");
    if (location && location.coords && mapRef.current) {
      // @ts-ignore
      mapRef.current.animateToRegion(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      ); // You can adjust the duration (1000 ms here) as needed
    }
  };

  return (
    <View style={tw.style(`flex-1`)}>
      <MapView
        ref={mapRef}
        style={tw`w-full ${
          height !== undefined ? `h-[${height}px]` : "h-full"
        } rounded-lg`}
        initialRegion={{
          latitude: location?.coords.latitude || 40,
          longitude: location?.coords.longitude || -123.11525937277163,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        onRegionChange={(region) => {
          handleRegionChange(region);
        }}
      >
        {visibleAlerts.map((a, i) => {
          // Render visible alerts
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: a.latitude,
                longitude: a.longitude,
              }}
            >
              <Image
                source={require("../../../assets/LocationDot.png")}
                style={tw.style(`w-20, h-20`)}
              />
            </Marker>
          );
        })}
        {visibleEarthquakes.map((a: any, i) => {
          // Render visible earthquakes
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: a.geometry.coordinates[1],
                longitude: a.geometry.coordinates[0],
              }}
            >
              <Image
                source={require("../../../assets/mapIcons/Earthquake.png")}
                style={tw.style(`w-20, h-20`)}
              />
            </Marker>
          );
        })}
        {visibleFires.map((a: any, i: number) => {
          // Render visible fires
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: parseFloat(a.latitude),
                longitude: parseFloat(a.longitude),
              }}
            >
              <Image
                source={require("../../../assets/mapIcons/Wildfire.png")}
                style={tw.style(`w-20, h-20`)}
              />
            </Marker>
          );
        })}
        {visibleTsunamis.map((a: any, i: number) => {
          // Render visible tsunamis
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: parseFloat(a.latitude),
                longitude: parseFloat(a.longitude),
              }}
            >
              <Image
                source={require("../../../assets/mapIcons/Tsunami.png")}
                style={tw.style(`w-20, h-20`)}
              />
            </Marker>
          );
        })}
        {friendsLocation &&
          friendsLocation?.map((a: any, i: number) => {
            return (
              <View key={i}>
                <Marker
                  key={i}
                  coordinate={{
                    latitude: parseFloat(a.latitude),
                    longitude: parseFloat(a.longitude),
                  }}
                />
              </View>
            );
          })}

        {draggableMarker && (
          <Marker
            coordinate={draggableMarker}
            draggable
            onDragEnd={(event) => {
              const newLatitude = event.nativeEvent.coordinate.latitude;
              const newLongitude = event.nativeEvent.coordinate.longitude;

              console.log(
                `Marker moved to: Latitude ${newLatitude}, Longitude ${newLongitude}`
              );

              setDraggableMarker({
                ...draggableMarker,
                latitude: newLatitude,
                longitude: newLongitude,
              });
              axios
                .post(
                  "https://oursos-backend-production.up.railway.app/reportalert",
                  {
                    message: "Fire Alert",
                    category: "Fire",
                    severity: "High",
                    latitude: newLatitude,
                    longitude: newLongitude,
                    radius: 1000.0,
                  }
                )
                .then(async (response) => {
                  await axios
                    .get(
                      "https://oursos-backend-production.up.railway.app/alerts"
                    )
                    .then((response) => {
                      setAlerts(response.data);
                    });
                  console.log(response);
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
          />
        )}
      </MapView>

      {buttons === true ? (
        <View style={tw`top-0 right-0 absolute bg-white p-2 rounded-bl-xl`}>
          <TouchableOpacity onPress={handleNewPin}>
            <Image
              source={require("../../../assets/mapui/MapUI-NewPin.png")}
              style={tw.style(`h-10 w-10 m-2`)}
            />
          </TouchableOpacity>
          <Pressable onPress={handleToggleMyLocation}>
            <Image
              source={require("../../../assets/mapui/MapUI-MyLoc.png")}
              style={tw.style(`h-10 w-10 m-2`)}
            />
          </Pressable>
          <Pressable onPress={handleReportAlert}>
            <Image
              source={require("../../../assets/mapui/MapUI-ReportAlert.png")}
              style={tw.style(`h-10 w-10 m-2`)}
            />
          </Pressable>
          <Modal
            animationType="slide"
            transparent={true}
            visible={CustomAlertModel}
            onRequestClose={() => {
              setCustomAlertModel(!CustomAlertModel);
            }}
          >
            <View style={tw`flex-1 justify-center items-center mt-6`}>
              <View
                style={tw`m-5 bg-white rounded-5 p-9 items-center shadow-xl`}
              >
                <Text style={tw`mb-4 text-center`}>Report Alert</Text>
                <Pressable
                  style={tw`rounded-5 p-2.5 my-1.5 elevation-2 bg-blue-500`}
                  onPress={() => {
                    console.log("Fire Alert Pin Dropped");
                    setCustomAlertModel(false);
                    if (location) {
                      setDraggableMarker({
                        category: "Fire",
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      });
                      // axios
                      //   .post(
                      //     "https://oursos-backend-production.up.railway.app/reportalert",
                      //     {
                      //       message: "Fire Alert",
                      //       category: "Fire",
                      //       severity: "High",
                      //       latitude: location.coords.latitude,
                      //       longitude: location.coords.longitude,
                      //       radius: 100.0,
                      //     }
                      //   )
                      //   .then(async (response) => {
                      //     await axios
                      //       .get(
                      //         "https://oursos-backend-production.up.railway.app/alerts"
                      //       )
                      //       .then((response) => {
                      //         setAlerts(response.data);
                      //       });
                      //     console.log(response);
                      //   })
                      //   .catch((error) => {
                      //     console.error(error);
                      //   });
                    }
                  }}
                >
                  <Text style={tw`mb-4 text-center`}>Fire</Text>
                </Pressable>
                <Pressable
                  style={tw`rounded-5 p-2.5 my-1.5 elevation-2 bg-blue-500`}
                  onPress={() => setCustomAlertModel(false)}
                >
                  <Text style={tw`mb-4 text-center`}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
