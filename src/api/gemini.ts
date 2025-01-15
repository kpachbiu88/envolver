import { GenerationConfig, GoogleGenerativeAI, SchemaType } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
})

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200,
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      error: {
        type: SchemaType.BOOLEAN
      },
      error_message: {
        type: SchemaType.STRING
      }
    },
    required: [
      "error",
      "error_message"
    ]
  },
}

interface ValidateResult {
  error: boolean
  error_message: string
}
 
export const validate = async (romanNumber: string): Promise<ValidateResult | undefined> => {
  try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
        systemInstruction: {
          role: "user",
          parts: [
            { text: "You are roman numbers validator" },
            { text: "You get roman number and validate it and give short error explanation" },
          ]
        }
      })
      const result = await chatSession.sendMessage(`validate roman number "${romanNumber}" and the return has an error or not and a short error explanation`)
      return JSON.parse(result.response.text())
  } catch (e) {
    console.error(e)
  }
}