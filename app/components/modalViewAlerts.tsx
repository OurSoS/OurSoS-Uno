import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";
import { alert, alertFilter } from "../../utils/static-types";
// import MapComp from "./molecules/map-comp";
import MapView from "react-native-map-clustering";
import { mapStyle } from "../../utils/static-types";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

type Alert = {
  type: string;
  latitude: number;
  longitude: number;
  geometry?: {
    coordinates: [number, number];
  };
  acq_time?: string;
  acq_date?: string;
  scan?: string;
  message?: string;
  radius?: string;
  lat?: string;
  long?: string;
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

  useEffect(() => {
    setMarkers(props.data);
    console.log(props.data);
    const testLog = props.data.map((alert: any) => alert.type);
    console.log(testLog);

    // console.log(props.data.map((alert:any) => alert.type))
  }, [props.data]);

  // console.log(props.data)

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
    <View style={tw.style("pl-2 pr-18")}>
      <View style={tw.style("h-10 bg-black text-white")}>
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
          style={tw.style("h-10 bg-black justify-center items-center")}
        >
          <Text style={tw.style("text-white text-lg font-bold")}>{filter}</Text>
        </Pressable>
      </View>
      {markers.map((alert: Alert, index: number) => (
        <View
          key={index}
          style={tw.style("flex flex-col bg-[#001D3D] rounded shadow-md  m-1")}
        >
          <View style={tw.style("flex flex-row p-2 m-2")}>
            <Image
              source={getAlertIcon(alert.type)}
              style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
            />

            <View style={tw.style("flex-1 flex-col ")}>
              <View>
                {alert.geometry !== undefined ? (
                  <Text style={tw.style("font-bold text-4xl text-white ")}>
                    Earthquake
                  </Text>
                ) : alert.scan !== undefined ? (
                  <Text style={tw.style("font-bold text-4xl text-white ")}>
                    Wildfire
                  </Text>
                ) : (
                  <Text style={tw.style("font-bold text-4xl text-white ")}>
                    {alert.type}
                  </Text>
                )}
                <Text style={tw.style("font-bold text-4xl text-white ")}></Text>
              </View>
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
                      mapType={"satellite"}
                      rotateEnabled={false}
                      loadingBackgroundColor={"#000000"}
                      style={{
                        height: 200,
                        width: 200,
                        borderRadius: 10,
                      }}
                      initialRegion={
                        (alert.type === "Fire" ||
                          alert.type === "Police" ||
                          alert.type === "Hazard") &&
                        alert.long &&
                        alert.lat
                          ? {
                              latitude: parseFloat(alert.lat || "0"),
                              longitude: parseFloat(alert.long || "0"),
                              latitudeDelta: 0.001,
                              longitudeDelta: 0.001,
                            }
                          : alert &&
                            alert.geometry &&
                            alert.geometry.coordinates
                          ? {
                              latitude: alert.geometry?.coordinates[1] || 0,
                              longitude: alert.geometry?.coordinates[0] || 0,
                              latitudeDelta: 0.001,
                              longitudeDelta: 0.001,
                            }
                          : alert && alert.scan
                          ? // PROBLEM HERE
                            {
                              latitude: 0,
                              longitude: 0,
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
                    >
                      {(alert.latitude && alert.longitude) ||
                      (alert.lat !== undefined && alert.long !== undefined) ? (
                        alert.lat !== undefined && alert.long !== undefined ? (
                          <Marker
                            coordinate={{
                              latitude: parseFloat(alert.lat) || 0,
                              longitude: parseFloat(alert.long) || 0,
                            }}
                          >
                            <Image
                              source={getAlertIcon(alert.type)}
                              style={{ width: 20, height: 20 }}
                            />
                          </Marker>
                        ) : alert.latitude && alert.longitude ? (
                          <Marker
                            coordinate={{
                              latitude: alert.latitude || 0,
                              longitude: alert.longitude || 0,
                            }}
                          >
                            <Image
                              source={getAlertIcon(alert.type)}
                              style={{ width: 20, height: 20 }}
                            />
                          </Marker>
                        ) : null
                      ) : null}
                    </MapView>
                    {alert.geometry ? (
                      <Text style={tw.style("text-sm text-white")}>
                        Location - {alert.geometry?.coordinates[1]}
                        {alert.geometry?.coordinates[0]}
                      </Text>
                    ) : alert.type ? (
                      <Text style={tw.style("text-sm text-white")}>
                        Location - {alert.lat}, {alert.long}
                      </Text>
                    ) : (
                      <Text style={tw.style("text-sm text-white")}>
                        Location - {alert.latitude}, {alert.longitude}
                      </Text>
                    )}
                  </>
                ) : null}
              </View>
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
