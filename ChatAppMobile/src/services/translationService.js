import * as Localization from 'expo-localization';

const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';

export const translateMessage = async (text, targetLanguage = Localization.locale.split('-')[0]) => {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
      }),
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};