import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

interface Language {
  language: string;
  name: string;
}

export async function getSupportedLanguages(
  targetLanguage = "en"
): Promise<Language[]> {
  if (!API_KEY) {
    console.error("API_KEY is not defined in the environment variables.");
    return [];
  }

  const endpoint =
    "https://translation.googleapis.com/language/translate/v2/languages";
  const params = new URLSearchParams({
    target: targetLanguage,
    key: API_KEY,
  });
  try {
    const response = await axios.get(endpoint, { params });
    return response.data.data.languages;
  } catch (error) {
    console.error("Error fetching supported languages:", error);
    return [];
  }
}
