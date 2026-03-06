import { GoogleGenAI, Type } from "@google/genai";
import { GameEvent } from "./types";

export async function generateCharacterImage(characterType: string): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: `A 2D cartoon style portrait of a ${characterType}, flat colors, thick outlines, Reigns game style, solid light background, centered, high quality, mobile game asset.`,
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to generate image:", error);
    return null;
  }
}

export async function generateDynamicEvents(count: number = 5): Promise<GameEvent[]> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate ${count} random events for a Reigns-style game where the player is the US President. The 4 stats are Public Approval, Economy, Military, Diplomacy. Return a JSON array of objects. ALL GENERATED TEXT MUST BE IN CHINESE (Simplified), EXCEPT for 'characterType' which MUST be in English. Each object must have: 'id' (unique string), 'description' (the event text in Chinese, max 150 chars), 'characterName' (who is speaking, in Chinese), 'characterType' (in English, e.g., 'General', 'Diplomat', 'Citizen', 'CEO', 'Foreign Leader'), 'leftChoice' (object with 'text' in Chinese and 'effects'), 'rightChoice' (object with 'text' in Chinese and 'effects'). 'effects' is an object with 'approval', 'economy', 'military', 'diplomacy' (numbers between -20 and 20).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              description: { type: Type.STRING },
              characterName: { type: Type.STRING },
              characterType: { type: Type.STRING },
              leftChoice: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  effects: {
                    type: Type.OBJECT,
                    properties: {
                      approval: { type: Type.NUMBER },
                      economy: { type: Type.NUMBER },
                      military: { type: Type.NUMBER },
                      diplomacy: { type: Type.NUMBER },
                    },
                    required: ["approval", "economy", "military", "diplomacy"]
                  }
                },
                required: ["text", "effects"]
              },
              rightChoice: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  effects: {
                    type: Type.OBJECT,
                    properties: {
                      approval: { type: Type.NUMBER },
                      economy: { type: Type.NUMBER },
                      military: { type: Type.NUMBER },
                      diplomacy: { type: Type.NUMBER },
                    },
                    required: ["approval", "economy", "military", "diplomacy"]
                  }
                },
                required: ["text", "effects"]
              }
            },
            required: ["id", "description", "characterName", "characterType", "leftChoice", "rightChoice"]
          }
        }
      }
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text) as GameEvent[];
    }
    return [];
  } catch (error) {
    console.error("Failed to generate events:", error);
    return [];
  }
}
