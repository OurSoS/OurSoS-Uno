import React, {useState, useEffect} from 'react';
import Constants from "expo-constants";
import { View, Text } from 'react-native';
import axios from 'axios';
import useContext from 'react';

const getDeviceId = (): string => {
  // This gets the installation ID, not a hardware ID
  return Constants.installationId;
};

const checkIfUserExists = async (deviceId: string): Promise<boolean> => {
  await axios.post(`https://oursos-backend-production.up.railway.app/users/${deviceId}`)
  .then((res) => {
    console.log(res.data)
    if (res.data === null) {
      return true;
    } else {
      return false;
    }
  })
  .catch((err) => {
    console.log(err)
  })
  console.log("The route is broken on the backend for Users.")
  return false;
}

const createUser = async (deviceId: string): Promise<boolean> => {
  await axios.post(`https://oursos-backend-production.up.railway.app/createuser`, deviceId)
  .then((res) => {
    console.log(res.data)
    if (res.data === null) {
      return true;
    } else {
      return false;
    }
  })
  .catch((err) => {
    console.log(err)
  })
  console.log("The route is broken on the backend for Users.")
  return false;
}

// const addFriend = async (deviceId: string): Promise<boolean> => {
//   await axios.post(`https://oursos-backend-production.up.railway.app/addfriend`, deviceId)
//   .then((res) => {
//     console.log(res.data)
//     if (res.data === null) {
//       return true;
//     } else {
//       return false;
//     }
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//   console.log("The route is broken on the backend for Users.")
//   return false;
// }

export default function AddFriend() {
  const [deviceId, setDeviceId] = useState("");
  const [userExists, setUserExists] = useState(false);
  // const [user, setUser] = useContext(User);
  useEffect(() => {
    setDeviceId(getDeviceId());
    console.log(deviceId)
    checkIfUserExists(deviceId).then((res) => {
      setUserExists(res)
    }).catch((err)=>console.log("user backend broken maybe"))
  }, []);

  return(<>
    <View>
      <Text>Your device ID: {deviceId}</Text>
      <Text>Test 1: check if user exists</Text>
      <Text>{userExists}</Text>
      <Text>asdf</Text>
    </View>
  </>)
}