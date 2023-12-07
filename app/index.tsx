import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ImageBackground,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Footer from "./components/molecules/Footer";

import { getDeviceId } from "./chat";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

type alert = {
  id?: number;
  message?: string;
  type: string;
  lat: Float;
  long: Float;
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

  const [translatedData, setTranslatedData] =
    useState<any>({});
  const [userLang, setUserLang] = useState("en");

  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [introComponent, setIntroComponent] = useState("");
  const tw = create(require("../tailwind.config.ts"));

  useEffect(() => {
    let deviceId = getDeviceId();
    console.log(deviceId);
    if (introComponent === "dashboard") {
      fetch(
        `https://oursos-backend-production.up.railway.app/users/${deviceId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data === null) {
            //IF the user does not exist, create a new user and display the INTRO rather than Dashboard.
            let userData = {
              deviceId: deviceId,
              username: deviceId,
              lat: location?.coords?.latitude,
              long: location?.coords?.longitude,
              languagepreference: userLang,
              profile: "https://picsum.photos/200/300?grayscale",
            };

            fetch(
              "https://oursos-backend-production.up.railway.app/createuser",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            )
              .then((response) => response.json())
              .then((data) => {

                AsyncStorage.setItem('currentUser', JSON.stringify(data))

                console.log({ data });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else {
            console.log("User already exists");
          }
        });
    }
  }, [introComponent]);


  useEffect(() => {
    (async () => {
      let currentUser = JSON.parse(
        await AsyncStorage.getItem('currentUser') || ""
      );

      let data = JSON.parse(
        await AsyncStorage.getItem('translatedData') || ""
      );
      setTranslatedData(data);

      setCurrentUser(currentUser);
      setUserLang(currentUser.languagepreference);
    })();
  }, [userLang]);



  const setUserLanguage = async () => {
    if (userLang) {
      setUserLang(userLang);
      (async () => {
        await axios
          .post<{ userLang: string }>(
            `https://oursos-backend-production.up.railway.app/translateobject/${userLang}`
          )
          .then((res) => {
            AsyncStorage.setItem('translatedData', JSON.stringify(res.data));
          });
      })();
    }
  };

  async function registerForPushNotificationsAsync() {
    let { status } = await Notification.requestPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Hey! You might want to enable notifications for my app, they are good."
      );
      return;
    }
  }

  useEffect(() => {
    (async () => {
      setLanguages([
        {
          name: "English",
          tag: "en",
        },
        {
          name: "Polski",
          tag: "pl",
        },
        {
          name: "中國傳統的）",
          tag: "zh-TW",
        },
        {
          name: "فارسی",
          tag: "fa",
        },
      ]);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let user = JSON.parse(await AsyncStorage.getItem('currentUser') || "");

      await axios.post(`https://oursos-backend-production.up.railway.app/translateobject/${userLang}`)
        .then((res) => {
          setTranslatedData(res.data);
          AsyncStorage.setItem('translatedData', JSON.stringify(res.data))
        })
    })();
  }, []);

  useEffect(() => {
    const init = async () => {
      await registerForPushNotificationsAsync();
    };

    init();
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
    let deviceId = getDeviceId();

    fetch(
      `https://oursos-backend-production.up.railway.app/users/${deviceId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          AsyncStorage.setItem('currentUser', JSON.stringify({}))
        }
      })

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

      retrieveAlerts();
      console.log("alerts");
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
      console.log(alerts);

      const distance = distanceBetweenPoints(
        myLatitude,
        myLongitude,
        alert.lat,
        alert.long
      );
      if (distance <= 100) {
        ++i;
        await sendLocalNotification(
          `Emergency Alert: There is a ${alert.type} in your area due to ${alert.message}. Seek safety immediately as per local guidelines and stay informed.`
        );
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
        trigger: null,
      });
    } catch (error) {
      console.error("Error in sending notification", error);
    }
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://oursos-backend-production.up.railway.app/users/${getDeviceId()}`
        )
        .then((res) => {

          setCurrentUser(res.data);
          // Stringify and store
          AsyncStorage.setItem('currentUser', JSON.stringify(res.data));
        });
    })();

  }, []);

  useEffect(() => {
    if (currentUser?.deviceId) {
      setIntroComponent("dashboard")
    } else {
      setIntroComponent("welcome")
    }
  }, [currentUser]);

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
        <ImageBackground
          source={require("../assets/Intro/Map.png")}
          style={[
            tw.style("flex-1 justify-center w-full"),
            { resizeMode: "cover" },
          ]}
        >
          {
            introComponent === "dashboard" ?
              (
                <Dashboard
                  user={currentUser}
                ></Dashboard>
              )

              : introComponent === "welcome" ? (
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
                          `px-7`,
                          `py-3`,
                          `rounded-lg`,
                          `border`,
                          `mb-3`,
                          userLang === languages[index]?.tag
                            ? `bg-gray-400`
                            : `bg-white`
                        )}
                      >
                        <Text style={styles.text}>{item.name}</Text>
                      </Pressable>
                    )}
                  />
                  <Pressable
                    onPress={() => {
                      setUserLanguage();
                      setIntroComponent("newsFeed");
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
                  heading={translatedData?.intro?.newsfeed}
                  details={translatedData?.intro?.newsfeedtext}
                  buttonNext="introMap"
                  buttonText={translatedData?.settings?.continue}
                  buttonFunction={buttonFunction}
                ></IntroTextButton>
              ) : introComponent === "introMap" ? (
                <IntroTextButton
                  heading={translatedData?.dashboard?.map}
                  details={translatedData?.intro["intro-map-text"]}
                  buttonNext="introFriends"
                  buttonText={translatedData?.settings?.continue}
                  buttonFunction={buttonFunction}
                ></IntroTextButton>
              ) : introComponent === "introFriends" ? (
                <IntroTextButton
                  heading={translatedData?.intro["friends-family"]}
                  details={translatedData.intro["friends-family-text"]}
                  buttonNext="dashboard"
                  buttonText={translatedData?.settings?.continue}
                  buttonFunction={buttonFunction}
                ></IntroTextButton>
              ) : <></>
          }
        </ImageBackground>
      </View>
      {introComponent === "dashboard" && <Footer />}
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
    backgroundColor: "#ffffff",
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
