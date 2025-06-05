import { GoogleGenAI } from "@google/genai";



const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const genAI = new GoogleGenAI({ apiKey: API_KEY });


export const generateGeminiResponse = async (messageText: string): Promise<string> => {
  if (!API_KEY) {
    console.error("Gemini API key not loaded. Make sure to set VITE_GEMINI_API_KEY in your .env file.");
    return "Error: Gemini API key not configured.";
  }

  try {
   
    
    const result = await genAI.models.generateContent({
        model: "gemini-1.5-flash-latest", 
        contents: [{ text: messageText }],
    });


    const text = result.text; 
    return text !== undefined ? text : ""; 
    
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "Error: Could not get response from AI."; 
  }
}; 