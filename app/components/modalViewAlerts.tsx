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
  desc?:string;
  latitude: number;
  longitude: number;
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
      country_id: string,
      latitude: string,
      longitude: string,
      bright_ti4: string,
      scan: string,
      track: string,
      acq_date: string,
      acq_time: string,
      satellite: string,
      instrument: string,
      confidence: string,
      version: string,
      bright_ti5: string,
      frp: string,
      daynight: string
    },
  ]
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
    console.log(JSON.stringify(props))
    setMarkers(
      props.data.map((marker) => {
        console.log(marker.type)
        if(marker.type === "WildFire")
        console.log(marker)
        let newMarker = { ...marker }; // create a copy of marker to avoid directly mutating props
        if (newMarker.geometry) {
          newMarker.type = "Earthquake";
        } else if (newMarker.scan) {
          newMarker.type = "Wildfire";
        } else if (newMarker.properties && newMarker.properties.tsunami === 1) {
          newMarker.type = "Tsunami";
        }
        return newMarker; // return the modified marker
      })
    );
    // console.log(markers);
    const testLog = markers.map((alert: any) => alert.type);
    console.log(testLog);
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
    <View>
      <View style={tw.style("h-10")}>
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
          <Text style={tw.style(" text-lg font-bold")}>{filter}</Text>
        </Pressable>
      </View>
      {markers.map((alert: Alert, index: number) => (
        <View
          key={index}
          style={tw.style("flex flex-col  rounded shadow-md  m-1")}
        >
          <View style={tw.style("flex flex-row p-2 m-2")}>
            <Image
              source={getAlertIcon(alert.type)}
              style={tw.style("w-10 h-10 mr-2 mt-1 self-center")}
            />

            <View style={tw.style("flex-1 flex-col ")}>
              <View>
                {alert.properties && alert.properties.title !== undefined ? (<>
                  <Text style={tw.style("font-bold text-4xl  ")}>
                    Earthquake
                  </Text>
                  <Text style={tw.style("italic text-xl")}>
                  {alert.properties.title}
                  </Text>
                  </>) : alert.scan !== undefined ? (
                  <Text style={tw.style("font-bold text-4xl  ")}>Wildfire</Text>
                ) : alert.message ? (<>
                  <Text style={tw.style("font-bold text-4xl  ")}>
                    {alert.type}
                  </Text>
                  <Text style={tw.style("italic text-xl")}>
                    {alert.message}
                  </Text>
                  </>) : null}
                <Text style={tw.style("font-bold text-4xl")}></Text>
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
