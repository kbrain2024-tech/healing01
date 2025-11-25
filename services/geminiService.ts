import { GoogleGenAI, Type } from "@google/genai";
import { WellnessRoutineResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWellnessRoutine = async (condition: string): Promise<WellnessRoutineResponse | null> => {
    const modelId = "gemini-2.5-flash";
    const prompt = `
        Create a gentle, 15-minute wellness routine for a senior (60+) who is feeling: "${condition}".
        The routine should be safe, easy to do at home, and relaxing.
        Return the response strictly in JSON format.
        Use "icon" values that correspond to lucide-react names (e.g., "Sun", "Coffee", "Stretch", "Book", "Smile").
    `;

    try {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        focus: { type: Type.STRING },
                        steps: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    time: { type: Type.STRING },
                                    activity: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                    icon: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) return null;
        
        return JSON.parse(text) as WellnessRoutineResponse;

    } catch (error) {
        console.error("Error generating routine:", error);
        return null;
    }
};

export const chatWithAdvisor = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
    const modelId = "gemini-2.5-flash";
    
    try {
        const chat = ai.chats.create({
            model: modelId,
            config: {
                systemInstruction: "You are a warm, empathetic health advisor for seniors named 'Wellness Bot'. Keep answers concise, encouraging, and easy to read. Do not provide medical diagnoses, but suggest healthy habits and natural care."
            },
            history: history
        });

        const response = await chat.sendMessage({ message });
        return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
    } catch (error) {
        console.error("Chat error:", error);
        return "죄송합니다. 일시적인 오류가 발생했습니다.";
    }
};