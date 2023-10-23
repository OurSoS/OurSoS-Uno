import React from "react";
import { staticType } from "..";
import staticText from "../../utils/static-text.json"

export const UserLanguageContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>(["en", () => null]);
export const StaticTextContext = React.createContext<[staticType, React.Dispatch<React.SetStateAction<staticType>>]>([staticText, () => null]);