import React from "react";

export const UserLanguageContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["en", () => null]);
export const StaticTextContext = React.createContext<[any, React.Dispatch<React.SetStateAction<any>>]>([{}, () => null]);