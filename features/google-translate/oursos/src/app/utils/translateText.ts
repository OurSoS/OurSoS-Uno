import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;

export async function translateText(
  text: string,
  targetLanguage: string = "en"
): Promise<string> {
  if (!API_KEY) {
    console.error("API_KEY is not defined in the environment variables.");
    return "Error: API key not set";
  }

  const endpoint = "https://translation.googleapis.com/language/translate/v2";
  const params = new URLSearchParams({
    q: text,
    target: targetLanguage,
    key: API_KEY,
  });

  try {
    const response = await axios.post(endpoint, params);
    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return "Error translating text";
  }
}
