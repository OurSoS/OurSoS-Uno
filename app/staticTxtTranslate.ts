/* 
 * Conditions for translation activation:
 * - Change in preferred language
 * - App boots up
 * 
 * - Retrieves the static app text json file and translates it
 * - Acts as a reference point for the static text in application after translation
 */

//* Retrieve untranslated app text as JSON
import * as untranslatedText from "../utils/static-text.json";

/*
 * Translate it to user's preferred language
 *
 * This method will work on sign in:
 * - Axios call to go backend - https://oursos-backend-production.up.railway.app/users
 * - Find user and access preferred language from there
 * 
 * How does translate accept data? It needs the string being translated but does it take 'en' or 
 * 'English' as the language flag?
 * - If 'En' style tag then need to run second axios call https://oursos-backend-production.up.railway.app/languagelistenglish
 * - Use this to generate a language list that we reference against
 * - Translate full lang name to partial
 * 
 * Is there some way to get it from the saved state? I think that would work for both conditions and
 * simplify a lot of things.
 */

let staticText = null

const translateText = (untranslatedText: {}) => {
 const translatedText = {"placeholder": "stuff"};
 staticText = translatedText;
}
translateText(untranslatedText);
export default staticText;