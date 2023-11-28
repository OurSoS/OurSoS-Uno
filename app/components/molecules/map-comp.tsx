import React, { useState, useEffect, useCallback } from "react";
import { Marker, PROVIDER_GOOGLE, MapType, Callout } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { ActivityIndicator, AlertType } from "react-native";
import { alertFilter, alert } from "../../../utils/static-types";
import {
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
import ModalViewAlerts from "../modalViewAlerts";
import debounce from "lodash.debounce";
import { router } from "expo-router";
import ModalCreateAlerts from "../modalCreateAlerts";
import {
  mapStyle,
  MapCompProps,
  LocationData,
  earthquake,
  getSeverityString,
} from "../../../utils/static-types";

export default function MapComp({ height, buttons }: MapCompProps) {
  const [showMapFeedModal, setShowMapFeedModal] = useState(false);
  const [alerts, setAlerts] = useState<alert[]>([]);
  const [earthquakes, setEarthquakes] = useState<earthquake[]>([]);
  const [fires, setFires] = useState<any>([]);
  const [tsunamis, setTsunamis] = useState<any>([]);
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [friendsLocation, setFriendsLocation] = useState<any>([]);
  const [filter, setFilter] = useState<alertFilter>("All");
  const [visibleAlerts, setVisibleAlerts] = useState<alert[]>([]);
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
  const [generatedMarkers, setGeneratedMarkers] = useState<any>([]);
  const [visibleGeneratedMarkers, setVisibleGeneratedMarkers] = useState<any>(
    []
  );
  const [myAccurateLocation, setMyAccurateLocation] = useState<any>({});
  const [showAlertReportModal, setShowAlertReportModal] = useState(false);
  const [myMapType, setMyMapType] = useState<MapType>("standard");
  const [updateTick, setUpdateTick] = useState(false)
  const mapRef = React.useRef<MapView>(null);

  const reportAlert = async (
    long: number,
    lat: number,
    message: string,
    category: string,
    severity: number,
    radius?: number
  ) => {
    axios
      .post("https://oursos-backend-production.up.railway.app/reportalert", {
        message: message,
        category: category,
        severity: severity,
        latitude: lat,
        longitude: long,
        radius: radius,
      })
      .then(async (response) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const updateVisibleMarkers = (type: alertFilter) => {
    console.log("Current filter is : ", type);
    switch (type) {
      case "All":
        setVisibleGeneratedMarkers(generatedMarkers);
        setVisibleEarthquakes(earthquakes);
        setVisibleFires(fires);
        setVisibleTsunamis(tsunamis);
        break;
      case "Earthquake":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes(earthquakes);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
      case "Wildfire":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes([]);
        setVisibleFires(fires);
        setVisibleTsunamis([]);
        break;
      case "Tsunami":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis(tsunamis);
        break;
      case "Fire":
        setVisibleGeneratedMarkers(
          generatedMarkers.filter((marker: any) => marker.type === "Fire")
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
      case "Hazard":
        setVisibleGeneratedMarkers(
          generatedMarkers.filter((marker: any) => marker.type === "Hazard")
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
      case "Police":
        setVisibleGeneratedMarkers(
          visibleGeneratedMarkers.filter(
            (marker: any) => marker.type === "Police"
          )
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
    }
  };

  const alertTypes: alertFilter[] = [
    "All",
    "Hazard",
    "Fire",
    "Police",
    "Earthquake",
    "Tsunami",
    "Wildfire",
  ];
  function getNextAlertType(currentType: alertFilter): alertFilter {
    const currentIndex = alertTypes.indexOf(currentType);
    const nextIndex = (currentIndex + 1) % alertTypes.length;
    console.log(alertTypes[nextIndex]);
    return alertTypes[nextIndex];
  }

  const newMarker = useCallback(
    (desc: string, severity: number, type: string, date: string) => {
      setGeneratedMarkers((prevMarkers: any) => [
        ...prevMarkers,
        {
          lat: myAccurateLocation.latitude,
          long: myAccurateLocation.longitude,
          desc: desc,
          type: type,
          severity: severity,
          date: date,
        },
      ]);
    },
    [myAccurateLocation.latitude, myAccurateLocation.longitude]
  );

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
        parseFloat(a.long) >= region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.long) <= region.longitude + region.longitudeDelta / 2
      );
    });

    //add on the types for the view feed
    setVisibleFires(
      visibleFires.map((fire: any) => ({ ...fire, type: "Wildfire" }))
    );
    setVisibleEarthquakes(
      visibleEarthquakes.map((earthquake: any) => ({
        ...earthquake,
        type: "Earthquake",
      }))
    );
    setVisibleTsunamis(
      visibleTsunamis.map((tsunami: any) => ({ ...tsunami, type: "Tsunami" }))
    );

    //NEW FILTER METHOD
    switch (filter) {
      case "All":
        setVisibleGeneratedMarkers(visibleGeneratedMarkers);
        setVisibleEarthquakes(visibleEarthquakes);
        setVisibleFires(visibleFires);
        setVisibleTsunamis(visibleTsunamis);
        break;
      case "Earthquake":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes(visibleEarthquakes);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
      case "Wildfire":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes([]);
        setVisibleFires(visibleFires);
        setVisibleTsunamis([]);
        break;
      case "Tsunami":
        setVisibleGeneratedMarkers([]);
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis(visibleTsunamis);
        break;
      case "Fire":
        setVisibleGeneratedMarkers(
          visibleGeneratedMarkers.filter(
            (marker: any) => marker.type === "Fire"
          )
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
      case "Hazard":
        setVisibleGeneratedMarkers(
          visibleGeneratedMarkers.filter(
            (marker: any) => marker.type === "Hazard"
          )
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
      case "Police":
        setVisibleGeneratedMarkers(
          visibleGeneratedMarkers.filter(
            (marker: any) => marker.type === "Police"
          )
        );
        setVisibleEarthquakes([]);
        setVisibleFires([]);
        setVisibleTsunamis([]);
        break;
    }

    // updateVisibleMarkers(filter);
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

//update region when alert created
useEffect(() => {
  handleRegionChange(currentRegion);
  console.log("new alert created")
}, [updateTick])

  const getCircleColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "yellow"; // Adjust this color based on your design
      case 2:
        return "red"; // Adjust this color based on your design
      default:
        return "gray";
    }
  };

  return (
    <View
      style={
        showMapFeedModal
          ? {}
          : tw.style("border-solid border-4 border-[#001D3D]")
      }
    >
      {showMapFeedModal === true ? (
        <ScrollView style={tw.style("flex")}>
          {visibleAlerts.length === 0 &&
          visibleEarthquakes.length === 0 &&
          visibleTsunamis.length === 0 &&
          visibleFires.length === 0 &&
          visibleGeneratedMarkers.length === 0 ? (
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
              {/* - TODO TASKS - */}
              {/* <ActivityIndicator size="large" color="#0000ff" /> */}

              <ModalViewAlerts
                data={[
                  ...visibleFires,
                  ...visibleEarthquakes,
                  ...visibleTsunamis,
                  ...visibleGeneratedMarkers,
                ]}
                type={"Combined"} // You can choose a type that represents the combined data
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
          updateMap={setUpdateTick}
          tick={updateTick}
        />
      ) : (
        <MapView
          ref={mapRef}
          spiralEnabled={false}
          mapType={myMapType}
          minPoints={3}
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
          minZoomLevel={7}
          showsUserLocation={true}
          onUserLocationChange={(event) => {
            setMyAccurateLocation(event.nativeEvent.coordinate);
          }}
          onRegionChangeComplete={(region) => {
            handleRegionChange(region);
            setCurrentRegion(region);
            console.log("line 453 visibleEarthquakes: ", visibleEarthquakes);
          }}
          clusterColor={"#001D3D"}
        >
          {/* {visibleAlerts.map((a, i) => {
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
                  style={{ width: 20, height: 20 }} 
                />
              </Marker>
            );
          })} */}

          {visibleEarthquakes &&
            visibleEarthquakes.length > 0 &&
            visibleEarthquakes.map((a: any, i) => {
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
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {visibleTsunamis &&
            visibleFires.length > 0 &&
            visibleFires.map((a: any, i: number) => {
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
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {visibleTsunamis &&
            visibleTsunamis.length > 0 &&
            visibleTsunamis.map((a: any, i: number) => {
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
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {/* {friendsLocation &&
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
            })} */}

          {/* {draggableMarker && (
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
          )} */}

          {visibleGeneratedMarkers &&
            visibleGeneratedMarkers.length > 0 &&
            visibleGeneratedMarkers.map((mark: any, i: number) => {
              // console.log(generatedMarkers[0])
              let imageSource;
              switch (mark.type) {
                case "Police":
                  imageSource = require("../../../assets/alert-categorys/Police.png");
                  break;

                case "Fire":
                  imageSource = require("../../../assets/alert-categorys/Fire.png");
                  break;
                case "Hazard":
                  imageSource = require("../../../assets/alert-categorys/Hazard.png");
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
                      `Marker moved to: Latitude ${newLatitude}, Longitude ${newLongitude}, Description: ${mark.desc}, Severity: ${mark.severity}, Type: ${mark.type}`
                    );

                    mark.lat = newLatitude;
                    mark.long = newLongitude;
                  }}
                >
                  {mark.severity && (
                    <View
                      style={{
                        position: "absolute",
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: getCircleColor(mark.severity),
                        borderBlockColor: "black",
                        borderWidth: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></View>
                  )}
                  <Image
                    source={imageSource}
                    style={{ width: 40, height: 40 }}
                  />
                  <Callout
                    style={tw.style(
                      "flex justify-center items-center h-20 w-50 rounded-lg"
                    )}
                  >
                    <View
                      style={tw.style("flex justify-left m-2 rounded-lg")}
                    ></View>
                    <View>
                      <Text style={tw.style("text-xl font-bold")}>
                        {mark.type + " - " + getSeverityString(mark.severity)}
                      </Text>
                      <Text>{mark.date}</Text>
                      <Text style={tw.style("")}>{mark.desc}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
        </MapView>
      )}

      {buttons === true ? (
        <View
          style={tw`top-20 right-0 absolute bg-white p-1 rounded-bl-xl rounded-tl-xl`}
        >
          {showMapFeedModal === false ? (
            <Pressable
              onPress={() => {
                if (myMapType === "standard") setMyMapType("satellite");
                else if (myMapType === "satellite") setMyMapType("standard");
              }}
            >
              <Image
                source={require("../../../assets/footerIcons/mapIcon.png")}
                style={tw.style(`h-8 w-8 m-2`)}
              />
            </Pressable>
          ) : (
            <View></View>
          )}
          {showMapFeedModal === false ? (
            <Pressable
              onPress={() => {
                setShowAlertReportModal(!showAlertReportModal);
              }}
            >
              <Image
                source={require("../../../assets/mapui/MapUI-NewPin.png")}
                style={tw.style(`h-8 w-8 m-2`)}
              />
            </Pressable>
          ) : (
            <View></View>
          )}
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              source={require("../../../assets/footerIcons/homeIcon.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </TouchableOpacity>

          {/* <Pressable onPress={handleReportAlert}>
            <Image
              source={require("../../../assets/mapui/MapUI-NewPin.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </Pressable> */}
          <TouchableOpacity
            onPress={() => setShowMapFeedModal(!showMapFeedModal)}
          >
            <Image
              source={require("../../../assets/mapui/apps-sort.png")}
              style={tw.style(`h-8 w-8 m-2`)}
            />
          </TouchableOpacity>
          {showMapFeedModal === false ? (
            <TouchableOpacity
              onPress={() => {
                if (showMapFeedModal === false) {
                  setFilter(getNextAlertType(filter));
                  updateVisibleMarkers(filter);
                  setUpdateTick(!updateTick)
                }
              }}
            >
              <Text>{filter}</Text>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
