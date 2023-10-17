"use client";
import { useState, useEffect } from "react";
import { getSupportedLanguages } from "@/app/utils/getLanguages";
import { translateText } from "@/app/utils/translateText";

// Define the Language interface here, or import it if it's in a different file
interface Language {
  language: string;
  name: string;
}

export default function Translate() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [translatedOutput, setTranslatedOutput] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  useEffect(() => {
    async function fetchLanguages() {
      const supportedLanguages = await getSupportedLanguages();
      setLanguages(supportedLanguages);
    }

    fetchLanguages();
  }, []);

  const handleTranslate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const translatedText = await translateText(inputText, selectedLanguage);
    setTranslatedOutput(translatedText);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10">
      <div className="text-center">
        <h1 className="text-4xl mb-4">OurSOS Translate</h1>
        <form className="flex flex-col items-center" onSubmit={handleTranslate}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-80 h-80 text-center py-2 px-4 border border-neutral-400 rounded-3xl mb-4"
            placeholder="Enter Text"
          />

          <div className="flex items-center space-x-4">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="text-center py-2 px-4 border border-neutral-400 rounded-3xl h-12"
            >
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>
                  {lang.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-3xl h-12"
            >
              Translate
            </button>
          </div>
        </form>
        <textarea
          value={translatedOutput}
          className="w-80 h-80 text-center py-2 px-4 border border-neutral-400 rounded-3xl mt-4 mb-4"
        />
      </div>
    </div>
  );
}
