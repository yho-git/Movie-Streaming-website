import { GoogleGenAI, Type } from "@google/genai";

export interface RecommendationResponse {
  title: string;
  year: string;
  genre: string;
  reasoning: string;
  matchScore: number;
}

export async function getMovieRecommendations(userPrompt: string): Promise<RecommendationResponse[]> {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY" || key === "") {
      throw new Error("Gemini API Key missing. Please click the 'Secrets' icon in the sidebar and add your 'GEMINI_API_KEY'.");
    }

    const ai = new GoogleGenAI({ apiKey: key });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: `You are CineMind AI, a futuristic movie recommendation engine. Based on the user's mood or preference: "${userPrompt}", provide exactly 3 futuristic or cinematic movie recommendations. Return ONLY a JSON array of objects.` }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              year: { type: Type.STRING },
              genre: { type: Type.STRING },
              reasoning: { type: Type.STRING },
              matchScore: { type: Type.NUMBER }
            },
            required: ["title", "year", "genre", "reasoning", "matchScore"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty response");
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    throw error;
  }
}
