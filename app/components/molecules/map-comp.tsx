import React, { useState, useEffect, useCallback } from "react";
import { Marker, PROVIDER_GOOGLE, MapType, Callout } from "react-native-maps";
import { Dimensions } from "react-native";
import MapView from "react-native-map-clustering";
import { ActivityIndicator, AlertType, Alert } from "react-native";
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
  earthquake,
  getSeverityString,
} from "../../../utils/static-types";
import { getDeviceId } from "../../chat";
export default function MapComp(props: MapCompProps) {
  const [showMapFeedModal, setShowMapFeedModal] = useState(false);
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
  //current region temporary fix set to vancouver area
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 49.246292,
    longitude: -123.116226,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [generatedMarkers, setGeneratedMarkers] = useState<any>([]);
  const [visibleGeneratedMarkers, setVisibleGeneratedMarkers] = useState<any>(
    []
  );
  const [myAccurateLocation, setMyAccurateLocation] = useState<any>({});
  const [showAlertReportModal, setShowAlertReportModal] = useState(false);
  const [myMapType, setMyMapType] = useState<MapType>("standard");
  const [updateTick, setUpdateTick] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapRef = React.useRef<MapView>(null);

  const updateVisibleMarkers = (type: alertFilter) => {
    // console.log("Current filter is : ", type);
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

  const onMapLayout = () => {
    setIsMapReady(true);
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
    // console.log(alertTypes[nextIndex]);
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
    if (!region) return;

    const visibleEarthquakes = earthquakes?.filter((a) => {
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

    const visibleFires = fires?.filter((a: any) => {
      // Check if the fire's latitude and longitude are within the visible region
      return (
        parseFloat(a.latitude) >= region.latitude - region.latitudeDelta / 2 &&
        parseFloat(a.latitude) <= region.latitude + region.latitudeDelta / 2 &&
        parseFloat(a.longitude) >=
          region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.longitude) <= region.longitude + region.longitudeDelta / 2
      );
    });

    const visibleTsunamis = tsunamis?.filter((a: any) => {
      // Check if the tsunami's latitude and longitude are within the visible region
      return (
        parseFloat(a.latitude) >= region.latitude - region.latitudeDelta / 2 &&
        parseFloat(a.latitude) <= region.latitude + region.latitudeDelta / 2 &&
        parseFloat(a.longitude) >=
          region.longitude - region.longitudeDelta / 2 &&
        parseFloat(a.longitude) <= region.longitude + region.longitudeDelta / 2
      );
    });

    const visibleGeneratedMarkers = generatedMarkers?.filter((a: any) => {
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

  const handleConfirmation = (alert: any): Promise<boolean> => {
    console.log(generatedMarkers);
    let combineDesc = "";
    return new Promise((resolve) => {
      Alert.alert("Confirm Alert", "Are you sure you want to make a report?", [
        {
          text: "Cancel",
          onPress: () => {
            resolve(false);
            Alert.alert("Your Report has been deleted. ❌");
          },
        },
        {
          text: "Report Alert",
          onPress: () => {
            Alert.alert("Your Report has been submitted. ✅");
            alert.confirmed = true;
            setFilter("All");
            //TODO: fetch .principalSubdivision && .locality
            axios
              .get(
                `https://api-bdc.net/data/reverse-geocode?latitude=${alert.lat}&longitude=${alert.long}&localityLanguage=en&key=bdc_60a73c32772246e09c3f6e8bed5ca65e`
              )
              .then((response) => {
                combineDesc +=
                  response.data.locality +
                  ", " +
                  response.data.principalSubdivision;
                alert.desc = alert.desc + " - " + combineDesc;

                axios
                  .post(
                    "https://oursos-backend-production.up.railway.app/reportalert",
                    {
                      message: alert.desc + " - " + combineDesc,
                      type: alert.type,
                      severity: alert.severity,
                      lat: alert.lat,
                      long: alert.long,
                    }
                  )
                  .then(async (response) => {
                    resolve(true);
                  })
                  .catch((error) => {
                    console.error(error);
                    resolve(true);
                  });
              })
              .catch((error) => console.log(error));
          },
        },
      ]);
    });
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
          // console.log(response.data);
          if (response.data === null) {
            console.log("No data received from the server");
            // setGeneratedMarkers([]);
          } else {
            setGeneratedMarkers(response.data);
            setGeneratedMarkers(
              response.data.map((marker: any) => ({
                ...marker,
                confirmed: true,
              }))
            );
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 503) {
            console.log(
              "Service temporarily unavailable. Please try again later. (Backend /alerts broken)"
            );
            // Optionally, you can setGeneratedMarkers([]) or take other actions.
          } else {
            console.error(error);
          }
        });

      await fetch(
        `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
      )
        .then((response) => response.json())
        .then(async (response) => {
          const res = await fetch(
            `https://oursos-backend-production.up.railway.app/getfriendsforuser/${response.id}`
          );
          const data = await res.json();
          data.map((friend: any) => {
            setFriendsLocation((prev: any) => [
              ...prev,
              {
                id: friend.id,
                longitude: friend.long,
                latitude: friend.lat,
                username: friend.username,
                profile: friend.profile,
              },
            ]);
          });
        });

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
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
    // console.log("new alert created")
  }, [updateTick]);

  const getCircleColor = (severity: number) => {
    switch (severity) {
      case 1:
        return "yellow";
      case 2:
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <View>
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
              <Pressable
                style={tw.style(
                  "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
                )}
                onPress={() => {
                  setShowMapFeedModal(false);
                }}
              >
                <Text style={tw.style("text-white")}>Back To Map</Text>
              </Pressable>
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
                setShowModal={setShowMapFeedModal}
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
          myLocation={myAccurateLocation}
          setShowModal={setShowAlertReportModal}
        />
      ) : (
        <MapView
          scrollEnabled={props.scrollEnabled}
          pitchEnabled={props.pitchEnabled}
          toolbarEnabled={props.toolbarEnabled}
          zoomEnabled={props.zoomEnabled}
          ref={mapRef}
          spiralEnabled={false}
          mapType={myMapType}
          minPoints={2}
          mapPadding={{ top: 0, right: 0, bottom: 20, left: 0 }}
          rotateEnabled={false}
          provider={PROVIDER_GOOGLE}
          loadingBackgroundColor={"#000000"}
          style={{
            height: props.height !== undefined ? props.height : "100%",
            borderRadius: 10,
          }}
          customMapStyle={mapStyle}
          initialRegion={currentRegion}
          showsMyLocationButton={true}
          // minZoomLevel={2}
          showsUserLocation={true}
          onUserLocationChange={(event) => {
            setMyAccurateLocation(event.nativeEvent.coordinate);
          }}
          onRegionChangeComplete={(region) => {
            handleRegionChange(region);
            setCurrentRegion(region);
            // console.log("line 453 visibleEarthquakes: ", visibleEarthquakes);
          }}
          clusterColor={"#001D3D"}
          onMapReady={onMapLayout}
        >
          {isMapReady &&
            visibleEarthquakes &&
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
                  title={a.properties.title}
                >
                  <View
                    style={{
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: "lightgray",
                      borderBlockColor: "black",
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Image
                    source={require("../../../assets/mapIcons/Earthquake.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {isMapReady &&
            visibleFires &&
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
                  <View
                    style={{
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: "orange",
                      borderBlockColor: "black",
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Image
                    source={require("../../../assets/mapIcons/Wildfire.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {isMapReady &&
            visibleTsunamis &&
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
                  <View
                    style={{
                      position: "absolute",
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      backgroundColor: "lightblue",
                      borderBlockColor: "black",
                      borderWidth: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Image
                    source={require("../../../assets/mapIcons/Tsunami.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}
          {friendsLocation &&
            friendsLocation?.map((friend: any, i: number) => {
              return (
                <Marker
                  key={i}
                  title={friend.username}
                  coordinate={{
                    latitude: parseFloat(friend.latitude),
                    longitude: parseFloat(friend.longitude),
                  }}
                >
                  <Image
                    source={{ uri: friend.profile }}
                    style={{ width: 20, height: 20 }}
                  />
                </Marker>
              );
            })}

          {isMapReady &&
            visibleGeneratedMarkers &&
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
                  draggable={!mark.confirmed}
                  onDragEnd={async (event) => {
                    const newLatitude = event.nativeEvent.coordinate.latitude;
                    const newLongitude = event.nativeEvent.coordinate.longitude;

                    // Update marker position
                    mark.lat = newLatitude;
                    mark.long = newLongitude;

                    const isConfirmed = await handleConfirmation(mark);

                    if (isConfirmed) {
                      //This currently fires whether the backend worked or not
                      //TODO: check if went through to backend and handle
                      mark.confirmed = true;
                    } else {
                      //This is if the user clicks cancel meaning they don't want to report the alert
                      setGeneratedMarkers((prevMarkers: any) =>
                        prevMarkers.slice(0, -1)
                      );
                      setFilter("All");
                      updateVisibleMarkers(filter);
                      setUpdateTick(!updateTick);
                    }
                  }}
                >
                  {mark.severity && (
                    <View
                      style={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        backgroundColor: !mark.confirmed
                          ? "black"
                          : getCircleColor(mark.severity),
                        borderWidth: !mark.confirmed ? 3 : 1, // Adjust border width based on drag state
                        borderColor: !mark.confirmed
                          ? "rgba(0, 0, 0, 1)"
                          : "black", // Adjust border color based on drag state
                        justifyContent: "center",
                        alignItems: "center",

                        // Additionl styling for the glowing effect when draggable
                        shadowColor: !mark.confirmed ? "black" : "transparent",
                        shadowOffset: !mark.confirmed
                          ? { width: 10, height: 10 }
                          : { width: 0, height: 0 },
                        shadowOpacity: !mark.confirmed ? 1 : 0,
                        shadowRadius: !mark.confirmed ? 10 : 0,
                      }}
                    ></View>
                  )}
                  <Image
                    source={imageSource}
                    style={{ width: 20, height: 20 }}
                  />
                  <Callout
                    style={tw.style(
                      "flex justify-center items-center h-20 w-50 rounded-lg"
                    )}
                  >
                    <View style={tw.style("flex m-2 rounded-lg")}></View>
                    <View>
                      <Text style={tw.style("text-xl font-bold")}>
                        {mark.type + " - " + getSeverityString(mark.severity)}
                      </Text>
                      <Text>{mark.date}</Text>
                      <Text style={tw.style("")}>{mark.message}</Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
        </MapView>
      )}

      {props.buttons === true &&
      showAlertReportModal === false &&
      showMapFeedModal === false ? (
        <View
          style={tw`w-16 items-center justify-center top-15 right-0 absolute bg-white p-2 rounded-bl-xl rounded-tl-xl`}
        >
          {/* //SATELLITE BUTTON */}
          {showMapFeedModal === false ? (
            <Pressable
              onPress={() => {
                if (myMapType === "standard") setMyMapType("satellite");
                else if (myMapType === "satellite") setMyMapType("standard");
              }}
            >
              <Image
                source={require("../../../assets/footerIcons/mapIcon.png")}
                style={tw.style(`h-8 w-8 ml-2`)}
              />
              <Text style={tw.style("text-center mb-2")}>{myMapType}</Text>
              {/* <Text style={tw.style("text-center mb-2")}>Map</Text> */}
            </Pressable>
          ) : (
            <View></View>
          )}
          {/* //REPORT ALERT BUTTON */}
          {showMapFeedModal === false ? (
            <Pressable
              onPress={() => {
                setShowAlertReportModal(!showAlertReportModal);
              }}
            >
              {/* <Text style={{ textAlign: 'center' }}>Report</Text> */}
              <Image
                source={require("../../../assets/mapui/MapUI-NewPin.png")}
                style={tw.style(`h-8 w-8 ml-2`)}
              />
              <Text style={tw.style("text-center mb-2")}>Report</Text>
            </Pressable>
          ) : (
            <View></View>
          )}
          {/* //SRINK BUTTON */}
          <TouchableOpacity onPress={() => router.push("/")}>
            <Image
              source={require("../../../assets/mapui/Shrink-Map.png")}
              style={tw.style(`h-8 w-8 ml-2`)}
            />
            <Text style={tw.style("text-center mb-2")}>Shrink</Text>

            {/* <Text style={tw.style("text-center mb-2")}>Resize</Text> */}
          </TouchableOpacity>

          {/* //LIST BUTTON */}
          <TouchableOpacity
            onPress={() => setShowMapFeedModal(!showMapFeedModal)}
          >
            <Image
              source={require("../../../assets/mapui/apps-sort.png")}
              style={tw.style(`h-8 w-8 ml-2`)}
            />
            <Text style={tw.style("text-center mb-2")}>List</Text>
          </TouchableOpacity>
          {/* //FILTER BUTTON */}
          {showMapFeedModal === false ? (
            <TouchableOpacity
              onPress={() => {
                if (showMapFeedModal === false) {
                  setFilter(getNextAlertType(filter));
                  updateVisibleMarkers(filter);
                  setUpdateTick(!updateTick);
                }
              }}
            >
              <Text style={{ textAlign: "center" }}>Show</Text>
              {filter === "Police" || filter === "All" ? (
                <Text style={tw.style("text-center mb-2 text-xs")}>
                  {filter}
                </Text>
              ) : (
                <Text
                  style={tw.style("text-center mb-2 text-xs")}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {filter}s
                </Text>
              )}
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
