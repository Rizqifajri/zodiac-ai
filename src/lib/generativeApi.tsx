import { GoogleGenerativeAI } from "@google/generative-ai";


export async function runGenerativeAI(prompt: string, conversation: string): Promise<string> {
  const API_KEY = process.env.API_KEY || "AIzaSyBch4vI2yIxYiESi2jJlnu1P63HsDeWLdU";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });  
  const fullPrompt = `${conversation}\nUser: ${prompt}\nBot:`;
  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}
