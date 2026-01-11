import { GoogleGenAI } from "@google/genai"

/**
 * Initialize Gemini AI client
 * - Uses API key from environment variables
 */
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

/**
 * Generates AI content for blog writing
 * @param {string} prompt - Blog title or topic
 * @returns {string} Generated blog content
 */
async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
    })

    // Return plain text output from Gemini
    return response.text
}

export default main