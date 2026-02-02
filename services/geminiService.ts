
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, QuestionPaper, QuestionType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePaper = async (params: GenerationParams): Promise<QuestionPaper> => {
  const { subject, grade, topics, difficulty, questionCount } = params;

  const prompt = `Generate a comprehensive and high-quality question paper for the following:
    Subject: ${subject}
    Grade/Level: ${grade}
    Topics to cover: ${topics}
    Overall Difficulty: ${difficulty}
    Target Question Count: ${questionCount}

    Requirements:
    - Create a mix of question types (MCQs, True/False, Short Answer, etc.) unless restricted.
    - Ensure questions are accurate and appropriate for the grade level.
    - Provide a professional title and clear instructions.
    - Assign realistic marks to each question.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subject: { type: Type.STRING },
          grade: { type: Type.STRING },
          duration: { type: Type.STRING, description: "Suggested time like '60 minutes'" },
          totalMarks: { type: Type.NUMBER },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                text: { type: Type.STRING },
                type: { 
                  type: Type.STRING,
                  description: "One of: MCQ, TRUE_FALSE, SHORT_ANSWER, LONG_ANSWER, FILL_IN_BLANKS"
                },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Only for MCQ types"
                },
                answer: { type: Type.STRING },
                marks: { type: Type.NUMBER }
              },
              required: ["id", "text", "type", "answer", "marks"]
            }
          }
        },
        required: ["title", "subject", "grade", "duration", "totalMarks", "instructions", "questions"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as QuestionPaper;
};
