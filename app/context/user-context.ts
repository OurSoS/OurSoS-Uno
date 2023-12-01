import React from "react";

export type UserType = {
      id: number;
      deviceId: string;
      username: string;
      lat: number;
      long: number;
      languagepreference: string,
      friends: number[],
      profile: string
} 

const user: UserType = {
      id: 0,
      deviceId: "",
      username: "",
      lat: 0,
      long: 0,
      languagepreference: "",
      friends: [],
      profile: ""
}

export const UserContext = React.createContext<[UserType, React.Dispatch<React.SetStateAction<string>>]>([user, () => null]);
