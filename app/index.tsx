import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { Link } from "expo-router";
import React, { useState, useEffect, useContext } from "react";
import * as Location from "expo-location";
import axios from "axios";
import staticText from "../utils/static-text.json";
import IntroTextButton from "./components/intro/intro-text-button";
import IntroLayout from "./components/intro/_layout";
import tw, { create } from "twrnc";
import Dashboard from "./components/dashboard/dashboard";
import { Suspense } from "react";
import Loading from "./components/loading";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import * as Notification from "expo-notifications";

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

export type staticType = {
  "intro-friends": {
    details: string;
    heading: string;
  };
  "intro-map": {
    details: string;
    heading: string;
  };
  "intro-newsfeed": {
    details: string;
    heading: string;
  };
  map: {
    heading: string;
    "search-placeholder": string;
  };
  news: {
    heading: string;
    "search-placeholder": string;
    "pins-header": string;
    "friends-header": string;
    "view-more": string;
  };
  friends: {
    "search-placeholder": string;
  };
  article: {
    details: string;
  };
  "button-text": {
    continue: string;
    "back-button": string;
  };
};

type LanguageType = {
  name: string;
  tag: string;
};

export default function Index() {
  const [alerts, setAlerts] = useState<alert[]>([]);
  const [earthquakes, setEarthquakes] = useState<earthquake[]>([]);
  const [fires, setFires] = useState<any>([]);
  const [tsunamis, setTsunamis] = useState<any>([]);

  const [translatedStaticContent, setTranslatedStaticContent] =
    useState<any>(staticText);
  const [userLang, setUserLang] = useState("hi");
  const [introComponent, setIntroComponent] = useState("map");
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const tw = create(require("../tailwind.config.ts"));
  const setUserLanguage = async () => {
    const updateUserRequest = {
      username: "sam",
      latitude: 49.26357,
      longitude: -123.13857,
      languagepreference: userLang, // Ensure that languageTag is defined and has a valid value
      friends: [2, 3],
      profile: "https://picsum.photos/200/300?grayscale",
    };
    // if (userLang) {
    //   setUserLang(userLang);

    //   await axios
    //     .post<{ translateObject: staticType; lang: string }>(
    //       "https://oursos-backend-production.up.railway.app/translateobject",
    //       { translateObject: staticText, lang: userLang }
    //     )
    //     .then((res) => {
    //       setTranslatedStaticContent(res.data);
    //       setIntroComponent("newsFeed");
    //     });
    // }
  };

  async function registerForPushNotificationsAsync() {
    let { status } = await Notification.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      );
      return;
    }
    // Here you might want to save the token if you plan to use remote notifications
  }
  useEffect(() => {
    const init = async () => {
      await registerForPushNotificationsAsync();
    };

    init();
  }, []);

  Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // calculate distance between two points
  const degreesToRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const distanceBetweenPoints = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  useEffect(() => {
    (async () => {
      // await axios
      //   .get("https://oursos-backend-production.up.railway.app/languages")
      //   .then((res) => {
      //     setLanguages(res.data);
      //   });

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
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

      retrieveAlerts();
      // console.log("alerts");
      // alerts ["latitude": 49.2827, "longitude": -123.1207,"radius": 5]
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location && location.coords) {
        checkAndNotifyForAlerts(
          location.coords.latitude,
          location.coords.longitude,
          alerts
        );
      }
    })();
  }, [alerts]);

  const checkAndNotifyForAlerts = async (
    myLatitude: number,
    myLongitude: number,
    alerts: alert[]
  ) => {
    // console.log(alerts.length);
    let i = 0;
    for (let alert of alerts) {
      if (alert.radius !== undefined) {
        const distance = distanceBetweenPoints(
          myLatitude,
          myLongitude,
          alert.latitude,
          alert.longitude
        );
        if (distance <= 0.01) {
          // Longitude/Latitude is in degrees, so 0.1 is about 11km where as before our radius was 550km distances which was too far to alert users
          ++i;
          console.log("alert", alert.category, alert.id);
          await sendLocalNotification(
            `Emergency Alert: Immediate danger in your area due to a ${alert.category}. Seek safety immediately as per local guidelines and stay informed.`
          );
        }
      }
    }
  };

  const sendLocalNotification = async (message: string) => {
    try {
      await Notification.scheduleNotificationAsync({
        content: {
          title: "Alert Notification",
          body: message,
        },
        trigger: null, // Immediate trigger
      });
    } catch (error) {
      console.error("Error in sending notification", error);
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get("https://oursos-backend-production.up.railway.app/users/1")
        .then((res) => {
          setCurrentUser(res.data);
        });
    })();
  }, [alerts]);

  const buttonFunction = (buttonText: string) => {
    setIntroComponent(buttonText);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <>
      <Suspense fallback={<Loading />}></Suspense>
      <View style={styles.container}>
        {introComponent === "welcome" ? (
          <IntroTextButton
            heading="Welcome To OurSOS!"
            details="Empowering Your Safety, Connecting Our World"
            buttonNext="selectLocation"
            buttonText="Select Language"
            buttonFunction={buttonFunction}
          ></IntroTextButton>
        ) : introComponent === "selectLocation" ? (
          <IntroLayout>
            <Text style={styles.header}>Select your language</Text>
            <FlatList
              style={tw.style(`w-full`, `flex`, `flex-col`)}
              data={languages}
              renderItem={({
                item,
                index,
              }: {
                item: LanguageType;
                index: number;
              }) => (
                <Pressable
                  onPress={() => {
                    setUserLang(languages[index]?.tag);
                  }}
                  style={tw.style(
                    `text-white`,
                    `bg-white`,
                    `px-7`,
                    `py-3`,
                    `rounded-lg`,
                    `border`,
                    `mb-3`
                  )}
                >
                  <Text style={styles.text}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable
              onPress={() => {
                setUserLanguage();
              }}
              style={tw.style(
                `text-white`,
                `bg-[#003566]`,
                `px-7`,
                `py-3`,
                `rounded-lg`
              )}
            >
              <Text style={tw.style(`text-white`)}>Continue</Text>
            </Pressable>
          </IntroLayout>
        ) : introComponent === "newsFeed" ? (
          <IntroTextButton
            heading={translatedStaticContent["intro-newsfeed"].heading}
            details={translatedStaticContent["intro-newsfeed"].details}
            buttonNext="introMap"
            buttonText={translatedStaticContent["button-text"].continue}
            buttonFunction={buttonFunction}
          ></IntroTextButton>
        ) : introComponent === "introMap" ? (
          <IntroTextButton
            heading={translatedStaticContent["intro-map"].heading}
            details={translatedStaticContent["intro-map"].details}
            buttonNext="introFriends"
            buttonText={translatedStaticContent["button-text"].continue}
            buttonFunction={buttonFunction}
          ></IntroTextButton>
        ) : introComponent === "introFriends" ? (
          <IntroTextButton
            heading={translatedStaticContent["intro-friends"].heading}
            details={translatedStaticContent["intro-friends"].details}
            buttonNext="dashboard"
            buttonText={translatedStaticContent["button-text"].continue}
            buttonFunction={buttonFunction}
          ></IntroTextButton>
        ) : (
          <Dashboard user={currentUser} userLang={userLang}></Dashboard>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  btnContinue: {
    backgroundColor: "#003566",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "rgba(125, 125, 125, .6)",
    marginTop: 24,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    top: 0,
    position: "absolute",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "black",
  },
});
