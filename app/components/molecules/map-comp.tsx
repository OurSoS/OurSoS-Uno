import React, { useState, useEffect, useCallback } from "react";
import { Marker, PROVIDER_GOOGLE, MapType } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { ActivityIndicator } from "react-native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import axios from "axios";
import tw from "twrnc";
import * as Location from "expo-location";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import ModalViewAlerts from "../modalViewAlerts";
import debounce from "lodash.debounce";
import { router } from "expo-router";
import ModalCreateAlerts from "../modalCreateAlerts";

const mapStyle = [
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f6d165",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffc736",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#303030",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#0090f9",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

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
  router.push("/");
};

export default function MapComp({ height, buttons }: MapCompProps) {
  const [CustomAlertModel, setCustomAlertModel] = useState(false);
  const [draggableMarker, setDraggableMarker] = useState<alert | null>(null);
  const [showMapFeedModal, setShowMapFeedModal] = useState(false);
  const [alerts, setAlerts] = useState<alert[]>([]);
  const [earthquakes, setEarthquakes] = useState<earthquake[]>([]);
  const [fires, setFires] = useState<any>([]);
  const [tsunamis, setTsunamis] = useState<any>([]);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [friendsLocation, setFriendsLocation] = useState<any>([]);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  

  const mapRef = React.useRef<MapView>(null);

  const [visibleAlerts, setVisibleAlerts] = useState<alert[]>([]);
  const [allVisibleAlerts, setAllVisibleAlerts] = useState<any>([]);
  const [visibleEarthquakes, setVisibleEarthquakes] = useState<earthquake[]>(
    []
  );
  const [visibleFires, setVisibleFires] = useState<any>([]);
  const [visibleTsunamis, setVisibleTsunamis] = useState<any>([]);
  const [jumpToLocation, setJumpToLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  //Recently added jacks stuff
  const [generatedMarkers, setGeneratedMarkers] = useState<any>([]);
  const [visibleGeneratedMarkers, setVisibleGeneratedMarkers] = useState<any>([]);
  const [myAccurateLocation, setMyAccurateLocation] = useState<any>({});
  const [showAlertReportModal, setShowAlertReportModal] = useState(false);
  const [myMapType, setMyMapType] = useState<MapType>("standard");

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

  const newMarker = useCallback((desc:string, severity:number, type:string) => {
    setGeneratedMarkers((prevMarkers:any) => [
      ...prevMarkers,
      {
        lat: myAccurateLocation.latitude,
        long: myAccurateLocation.longitude,
        desc: desc,
        type: type,
        severity: severity,
      },
    ]);
  }, [myAccurateLocation.latitude, myAccurateLocation.longitude]);
  

  const handleRegionChange = debounce((region) => {
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

    const visibleGeneratedMarkers = generatedMarkers.filter((a: any) => {
      // Check if the tsunami's latitude and longitude are within the visible region
      return (
        parseFloat(a.lat) >= region.latitude - region.latitudeDelta / 2 &&
        parseFloat(a.lat) <= region.latitude + region.latitudeDelta / 2 &&
        parseFloat(a.long) >=
          region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.long) <= region.longitude + region.longitudeDelta / 2
      );
    });

    // setAllVisibleAlerts(allVisibleAlerts.push(...visibleAlerts, ...visibleEarthquakes, ...visibleFires, ...visibleTsunamis));
    // console.log("ALL ALERTS: " + JSON.stringify(allVisibleAlerts));

    setVisibleGeneratedMarkers(visibleGeneratedMarkers);
    setVisibleAlerts(visibleAlerts);
    setVisibleEarthquakes(visibleEarthquakes);
    setVisibleFires(visibleFires);
    setVisibleTsunamis(visibleTsunamis);
  }, 0);

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
        // console.log(tsunamis);
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
          // console.log(tsunamis);
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
    // console.log("toggle my location");
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

  const getCircleColor = (severity:number) => {
    switch (severity) {
      case 1:
        return 'gray'; // Adjust this color based on your design
      case 2:
        return 'lightblue'; // Adjust this color based on your design
      case 3:
        return 'yellow'; // Adjust this color based on your design
      case 4:
        return 'orange'; // Adjust this color based on your design
      case 5:
        return 'red'; // Adjust this color based on your design
      default:
        return 'gray';
    }
  };
  

  return (
    <View style={tw.style("border-solid border-4 rounded-md border-[#001D3D]")}>
      {showMapFeedModal === true ? (
        <ScrollView style={tw.style("flex")}>
          {visibleAlerts.length === 0 &&
          visibleEarthquakes.length === 0 &&
          visibleTsunamis.length === 0 &&
          visibleFires.length === 0 ? (
            <View
              style={tw.style(
                "flex-1 justify-center items-center p-4 flex-col"
              )}
            >
              <Text style={tw.style("text-center text-lg font-bold mb-4")}>
                There are no visible alerts in your area... 😔
              </Text>
              <Text style={tw.style("text-center text-sm")}>
                Try moving the map to a new area!
              </Text>
            </View>
          ) : (
            <View style={tw.style("flex pb-100")}>
              {/* <ActivityIndicator size="large" color="#0000ff" /> */}
              {/* - TODO TASKS - */}
              {/* 1. Merge all the visible alerts  */}
              {/* 2. Sort the visible alerts by time */}
              {/* 3. Render the visible alerts */}

              <ModalViewAlerts
                data={visibleFires}
                type={"Fire"}
                setJumpToLocation={setJumpToLocation}
                jumpToLocation={jumpToLocation}
              />
              <ModalViewAlerts
                data={visibleEarthquakes}
                type={"Earthquake"}
                setJumpToLocation={setJumpToLocation}
                jumpToLocation={jumpToLocation}
              />
              <ModalViewAlerts
                data={visibleTsunamis}
                type={"Earthquake"}
                setJumpToLocation={setJumpToLocation}
                jumpToLocation={jumpToLocation}
              />
              <ModalViewAlerts
                data={visibleAlerts}
                type={"User Alert"}
                setJumpToLocation={setJumpToLocation}
                jumpToLocation={jumpToLocation}
              />
              <ModalViewAlerts
                data={visibleGeneratedMarkers}
                type={"User Alert"}
                setJumpToLocation={setJumpToLocation}
                jumpToLocation={jumpToLocation}
              />

              {/* <ModalViewAlerts data={allVisibleAlerts} type={"Fire"} setJumpToLocation={setJumpToLocation} jumpToLocation={jumpToLocation} /> */}
            </View>
          )}
        </ScrollView>
      ) : showAlertReportModal === true ? (
        <ModalCreateAlerts
          setter={setShowAlertReportModal}
          setGenMarkers={newMarker}
          setMapType={setMyMapType}
        />
      ) : (
        <MapView
          ref={mapRef}
          mapType={myMapType}
          mapPadding={{ top: 0, right: 0, bottom: 20, left: 0 }}
          rotateEnabled={false}
          provider={PROVIDER_GOOGLE}
          loadingBackgroundColor={"#000000"}
          style={{
            height: height !== undefined ? height : "100%",
            borderRadius: 10,
          }}
          customMapStyle={mapStyle}
          initialRegion={currentRegion}
          showsMyLocationButton={true}
          showsUserLocation={true}
          onUserLocationChange={(event) => {
            //This is our devices accurate location***
            // console.log(event.nativeEvent.coordinate);
            setMyAccurateLocation(event.nativeEvent.coordinate);
          }}
          onRegionChangeComplete={(region) => {
            // console.log(region);
            handleRegionChange(region);
            setCurrentRegion(region);
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
                  style={{ width: 20, height: 20 }} // Change the width and height as needed
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
                  style={{ width: 20, height: 20 }} // Change the width and height as needed
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
                  style={{ width: 20, height: 20 }} // Change the width and height as needed
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
                  style={{ width: 20, height: 20 }} // Change the width and height as needed
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
                    title={a.desc}
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
                      message: draggableMarker.category + "Alert",
                      category: draggableMarker.category,
                      severity: "High",
                      latitude: newLatitude,
                      longitude: newLongitude,
                      radius: 100.0,
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
                    // console.log(response);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            />
          )}

          {visibleGeneratedMarkers &&
            visibleGeneratedMarkers.length > 0 &&
            visibleGeneratedMarkers.map((mark: any, i: number) => {
              // console.log(generatedMarkers[0])
              let imageSource;
              switch (mark.type) {
                case "Police":
                  imageSource = require("../../../assets/alert-categorys/Police.png");
                  break;
                case "Ambulance":
                  imageSource = require("../../../assets/alert-categorys/Ambulance.png");
                  break;
                case "Fire":
                  imageSource = require("../../../assets/alert-categorys/Fire.png");
                  break;
                case "Suspicious":
                  imageSource = require("../../../assets/alert-categorys/Suspicious.png");
                  break;
                case "Traffic":
                  imageSource = require("../../../assets/alert-categorys/Traffic.png");
                  break;
              }
              return (
                <Marker
                  coordinate={{
                    latitude: mark.lat,
                    longitude: mark.long,
                  }}
                  key={i}
                  draggable={true}
                  onDragEnd={(event) => {
                    const newLatitude = event.nativeEvent.coordinate.latitude;
                    const newLongitude = event.nativeEvent.coordinate.longitude;

                    console.log(
                      `Marker moved to: Latitude ${newLatitude}, Longitude ${newLongitude}`
                    );

                    mark.lat = newLatitude;
                    mark.long = newLongitude;
                  }}
                  title={mark.desc}
                >
                  {mark.severity && mark.severity >= 1 && mark.severity <= 5 && (
                    <View
                      style={{
                        position: "absolute",
                        width: 20, // Diameter of the circle
                        height: 20, // Diameter of the circle
                        borderRadius: 20,
                        // borderTopRightRadius: 20, // Half of the width and height to make it a circle
                        backgroundColor: getCircleColor(mark.severity),
                        borderBlockColor: "black",
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* You can also add additional styling or text inside the circle if needed */}
                    </View>
                  )}
                  <Image
                    source={imageSource}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
        </MapView>
      )}

      {buttons === true ? (
        <View
          style={tw`top-20 right-0 absolute bg-white p-1 rounded-bl-xl rounded-tl-xl`}
        >
          <Pressable
            onPress={() => {
              if(myMapType === "standard")
                setMyMapType("satellite")
              else if(myMapType === "satellite")
                setMyMapType("standard")
            }}
          >
            <Image
              source={require("../../../assets/footerIcons/mapIcon.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              //TODO: First we need to open a modal to enter info detail about the alert
              setShowAlertReportModal(!showAlertReportModal);
            }}
          >
            <Image
              source={require("../../../assets/mapIcons/Location.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </Pressable>
          <TouchableOpacity onPress={handleNewPin}>
            <Image
              source={require("../../../assets/footerIcons/homeIcon.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </TouchableOpacity>

          <Pressable onPress={handleReportAlert}>
            <Image
              source={require("../../../assets/mapui/MapUI-NewPin.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </Pressable>
          <TouchableOpacity
            onPress={() => setShowMapFeedModal(!showMapFeedModal)}
          >
            <Image
              source={require("../../../assets/mapui/apps-sort.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={CustomAlertModel}
            onRequestClose={() => {
              setCustomAlertModel(!CustomAlertModel);
            }}
          >
            <View
              style={tw`flex-1 justify-center items-center mt-6 bg-black bg-opacity-50`}
            >
              <View style={tw`m-5 bg-white rounded-lg p-6 shadow-2xl`}>
                <Text style={tw`text-xl font-semibold mb-6 text-center`}>
                  Report Alert
                </Text>

                {/* Fire Button */}
                <Pressable
                  style={tw`rounded-lg py-3 my-2 bg-[#001d3d] shadow-md`}
                  onPress={() => {
                    console.log("Fire Alert Pin Dropped");
                    setCustomAlertModel(false);
                    if (location) {
                      setDraggableMarker({
                        category: "Fire",
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      });
                    }
                  }}
                >
                  <Text style={tw`text-white text-center font-medium`}>
                    Fire
                  </Text>
                </Pressable>
                {/* Earthquake Button */}
                <Pressable
                  style={tw`rounded-lg py-3 my-2 bg-[#001d3d] shadow-md`}
                  onPress={() => {
                    console.log("Earthquake Alert Pin Dropped");
                    setCustomAlertModel(false);
                    if (location) {
                      setDraggableMarker({
                        category: "Earthquake",
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      });
                    }
                  }}
                >
                  <Text style={tw`text-white text-center font-medium`}>
                    Earthquake
                  </Text>
                </Pressable>
                {/* Tsunami Button */}
                <Pressable
                  style={tw`rounded-lg py-3 my-2 bg-[#001d3d] shadow-md`}
                  onPress={() => {
                    console.log("Tsunami Alert Pin Dropped");
                    setCustomAlertModel(false);
                    if (location) {
                      setDraggableMarker({
                        category: "Tsunami",
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                      });
                    }
                  }}
                >
                  <Text style={tw`text-white text-center font-medium`}>
                    Tsunami
                  </Text>
                </Pressable>
                <Pressable
                  style={tw`rounded-lg py-3 my-2 bg-[#001d3d] shadow-md`}
                  onPress={() => setCustomAlertModel(false)}
                >
                  <Text style={tw`text-white text-center font-medium`}>
                    Close
                  </Text>
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
