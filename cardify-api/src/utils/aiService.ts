import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import fs from "fs";
import path from "path";
import { config } from "./config";
import { Difficulty, Flashcard, QuizQuestion } from "../types";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const fileManager = new GoogleAIFileManager(config.geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateContent(
    prompt: string,
    fileUrl: string,
    fileName: string
): Promise<string> {
    try {
        const response = await fetch(fileUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const tempFilePath = path.join(__dirname, "temp_file.pdf");
        fs.writeFileSync(tempFilePath, buffer);

        const uploadResponse = await fileManager.uploadFile(tempFilePath, {
            mimeType: "application/pdf",
            displayName: fileName,
        });

        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: "application/pdf",
                    fileUri: uploadResponse.file.uri,
                },
            },
            { text: prompt },
        ]);

        fs.unlinkSync(tempFilePath);

        return result.response.text();
    } catch (e) {
        console.error("An error occurred:", e);
        throw e;
    }
}

export async function generateFlashcards(
    numberOfFlashcards: number,
    difficultyLevel: Difficulty,
    goOutOfFileContent: boolean,
    fileURI: string,
    fileName: string
): Promise<Flashcard[]> {
    const prompt = `Generate flashcards based on the provided PDF content. The flashcards should consist of questions relevant to the topics covered in the document. Structure each flashcard as follows:

1. Question: Clearly state the question based on the information found in the PDF.
2. Answer: Provide a concise answer to the question.
3. Explanation: Offer a brief explanation supporting the answer, using information from the PDF.

Here are the parameters to use:  
- Number of flashcards: ${numberOfFlashcards}.  
- Difficulty level: ${difficultyLevel}.  
- Scope:  
   - If "go out of the file content" is ${goOutOfFileContent}, the AI may expand beyond the specific content in the PDF but must remain within the boundaries of the topics covered, using relevant information to support the topic.  
   - If false, the AI must strictly adhere to the information within the file and should not use any external content.

Difficulty Level Descriptions:
- Easy: Direct, fact-based questions that focus on recalling simple information from the PDF.
- Medium: Questions that require some understanding and interpretation of concepts, possibly connecting different ideas within the document.
- Hard: In-depth questions that involve analysis or synthesis of the material, testing a deeper understanding of the content.

Output format should be in json format:  
[
  {
    "question": "Sample question?",
    "answer": "Sample answer.",
    "explanation": "Brief explanation supporting the answer."
  }
]

Use these input parameters to generate the flashcards accurately. Ensure the flashcards are informative and relevant to the provided document.`;

    const result = await generateContent(prompt, fileURI, fileName);
    return JSON.parse(result);
}

export async function generateQuiz(
    numberOfQuestions: number,
    difficultyLevel: Difficulty,
    goOutOfFileContent: boolean,
    fileUri: string,
    fileName: string
): Promise<QuizQuestion[]> {
    const prompt = `Generate a quiz based on the provided PDF content. The quiz should consist of questions that are relevant to the topics covered in the document. Structure each question as follows:

1. Question: Clearly state the question based on the information found in the PDF.
2. Choices: Provide 2-4 multiple-choice options for each question.
3. Answer: Indicate the 0-index of the correct choice within the choices array.
4. Explanation: Offer a brief explanation of why this is the correct answer, drawing on the information from the PDF.

Here are the parameters to use:  
- Number of questions: ${numberOfQuestions}.  
- Difficulty level: ${difficultyLevel}.  
- go out of the file content: ${goOutOfFileContent}
   - If "go out of the file content" is true, the AI may expand beyond the specific content in the PDF but must remain within the boundaries of the topics covered, using relevant information to support the topic.  
   - If false, the AI must strictly adhere to the information within the file and should not use any external content.

Difficulty Level Descriptions:
- Easy: Simple, fact-based questions that require recalling information directly stated in the PDF without much interpretation or analysis.
- Medium: Questions that involve some understanding and interpretation of the concepts presented, possibly requiring connections between different sections of the document.
- Hard: Complex questions that may ask for in-depth analysis, synthesis, or application of the information, testing a deeper understanding of the content.

Output format should be in json format:  
[
  {
    "question": "Sample question?",
    "choices": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "answer": 0,
    "explanation": "Brief explanation of why this is the correct answer."
  }
]

Use these input parameters to tailor the quiz accurately. Ensure the quiz is informative and relevant to the provided document.`;

    const result = await generateContent(prompt, fileUri, fileName);
    console.log(result);
    return JSON.parse(result);
}
