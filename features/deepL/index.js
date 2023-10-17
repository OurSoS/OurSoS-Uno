import * as deepl from "deepl-node";

const authKey = "c57a5e96-a670-27d8-1322-24d48ebb2001:fx"; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
  const result = await translator.translateText(
    "Jun eats and poops a lot",
    null,
    "JA"
  ); // Input text, output language
  console.log(result.text); // Translated text
})();
