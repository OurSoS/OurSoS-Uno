import React from "react";
export const UserLanguageContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["en", () => null])