import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";
import { alert, alertFilter } from "../../utils/static-types";
// import MapComp from "./molecules/map-comp";
import MapView from "react-native-map-clustering";
import { mapStyle } from "../../utils/static-types";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { router } from "expo-router";
import axios from "axios";

type Alert = {
  type: string;
  desc?: string;
  latitude: string;
  longitude: string;
  geometry?: {
    coordinates: [number, number];
  };
  properties?: {
    tsunami: number;
    title: string;
  };
  acq_time?: string;
  acq_date?: string;
  scan?: string;
  message?: string;
  radius?: string;
  lat?: string;
  long?: string;
  data?: [
    {
      country_id: string;
      latitude: string;
      longitude: string;
      bright_ti4: string;
      scan: string;
      track: string;
      acq_date: string;
      acq_time: string;
      satellite: string;
      instrument: string;
      confidence: string;
      version: string;
      bright_ti5: string;
      frp: string;
      daynight: string;
    }
  ];
};

type ModalViewAlertsProps = {
  data: Alert[];
  setJumpToLocation: React.Dispatch<
    React.SetStateAction<{
      longitude: number;
      latitude: number;
    }>
  >;
  jumpToLocation: {
    longitude: number;
    latitude: number;
  };
  type: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  return alertTypes[nextIndex];
}

const ModalViewAlerts = React.memo((props: ModalViewAlertsProps) => {
  const [markers, setMarkers] = useState<any>([]);
  const [filter, setFilter] = useState<alertFilter>("All");
  const [userLang, setUserLang] = useState("fa");
  const [translatedData, setTranslatedData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await axios
        .post<{ userLang: string }>(
          `https://oursos-backend-production.up.railway.app/translateobject/${userLang}`
        )
        .then((res) => {
          setTranslatedData(res.data);
          console.log(
            "===============translateadData=============",
            translatedData
          );
        });
    })();
  }, []);

  useEffect(() => {
    setMarkers(
      props.data.map((marker) => {
        if (marker.geometry) {
          return { ...marker, type: "Earthquake" };
        } else if (marker.scan) {
          return { ...marker, type: "Wildfire" };
        } else if (marker.properties && marker.properties.tsunami === 1) {
          return { ...marker, type: "Tsunami" };
        }

        // For markers with existing types like "Hazard", "Police", "Fire"
        return marker;
      })
    );

    console.log(markers);
  }, [props.data]);

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "Wildfire":
        return require("../../assets/mapIcons/Wildfire.png");
      case "Earthquake":
        return require("../../assets/mapIcons/Earthquake.png");
      case "Tsunami":
        return require("../../assets/mapIcons/Tsunami.png");
      case "Hazard":
        return require("../../assets/alert-categorys/Hazard.png"); // Adjust as needed
      case "Fire":
        return require("../../assets/alert-categorys/Fire.png");
      case "Police":
        return require("../../assets/alert-categorys/Police.png");
      default:
        return null;
    }
  };

  return (
    <View style={tw.style("p-4")}>
      <View style={tw.style("")}>
        <Pressable
          style={tw.style(
            "flex flex-col p-2 bg-[#001d3d] rounded-md justify-center items-center"
          )}
          onPress={() => {
            props.setShowModal(false);
          }}
        >
          <Text style={tw.style("text-white")}>Back</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            const nextFilter = getNextAlertType(filter);
            setFilter(nextFilter);

            // Filter markers based on the selected type
            const filteredMarkers = props.data.filter(
              (marker) => marker.type === nextFilter
            );

            // Update the markers state with the filtered array
            setMarkers(filteredMarkers);
          }}
          style={tw.style("h-10 justify-center items-center")}
        >
          <Text style={tw.style(" text-lg font-bold")}>{filter}</Text>
        </Pressable>
      </View>
      {markers.map((alert: Alert, index: number) => (
        <View
          key={index}
          style={tw.style(
            "flex-col p-2 mb-2 bg-white rounded-lg shadow-md gap-4",
            {
              backgroundColor: "#fff",
            }
          )}
        >
          {/* Left column for alert details */}
          <View style={tw.style("flex-1")}>
            {/* Top left padding for the icon */}
            <View style={tw.style("flex-row items-center")}>
              <Image
                source={getAlertIcon(alert.type)}
                style={tw.style("w-8 h-8 mt-1")}
              />
              {/* Title next to the icon */}
              <Text style={tw.style("text-lg font-bold ml-1")}>
                {alert.type}
              </Text>
            </View>

            {/* Message or title in italic text */}
            <Text style={tw.style("italic mt-1")}>
              {alert.message || alert.properties?.title || ""}
            </Text>
          </View>

          {/* Right column for the MapView */}
          <View style={tw.style("flex-1")}>
            {/* PROBLEM STARTS HERE */}
            <View>
              {alert.type === "Fire" ||
              alert.type === "Police" ||
              alert.type === "Hazard" ||
              alert.scan !== undefined ||
              alert.geometry !== undefined ? (
                <>
                  <MapView
                    liteMode={true}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    mapType={"hybrid"}
                    rotateEnabled={false}
                    loadingBackgroundColor={"#000000"}
                    style={{
                      height: 150,
                    }}
                    //@ts-ignore
                    initialRegion={
                      (alert.type === "Fire" ||
                        alert.type === "Police" ||
                        alert.type === "Hazard") &&
                      alert.lat !== undefined &&
                      alert.long !== undefined
                        ? {
                            latitude: parseFloat(alert.lat),
                            longitude: parseFloat(alert.long),
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                          }
                        : alert.type === "Earthquake" ||
                          alert.type === "Tsunami"
                        ? {
                            latitude: alert?.geometry?.coordinates[1],
                            longitude: alert?.geometry?.coordinates[0],
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                          }
                        : alert.type === "Wildfire"
                        ? {
                            latitude: parseFloat(alert?.latitude),
                            longitude: parseFloat(alert?.longitude),
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                          }
                        : {
                            latitude: 0,
                            longitude: 0,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                          }
                    }
                  ></MapView>
                </>
              ) : null}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
});

// Function to get the appropriate icon based on the alert type
const getAlertIcon = (type: string) => {
  switch (type) {
    case "Wildfire":
      return require("../../assets/mapIcons/Wildfire.png");
    case "Earthquake":
      return require("../../assets/mapIcons/Earthquake.png");
    case "Tsunami":
      return require("../../assets/mapIcons/Tsunami.png");
    case "Hazard":
      return require("../../assets/alert-categorys/Hazard.png"); // Adjust as needed
    case "Fire":
      return require("../../assets/alert-categorys/Fire.png");
    case "Police":
      return require("../../assets/alert-categorys/Police.png");
    default:
      return null;
  }
};

export default ModalViewAlerts;
