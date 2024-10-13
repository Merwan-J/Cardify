export type Difficulty = "easy" | "medium" | "hard";
export type ContentTypes = "quiz" | "flashcard";

export interface QuizQuestion {
    question: string;
    choices: string[];
    answer: number;
    explanation: string;
}

export interface Flashcard {
    question: string;
    answer: string;
    explanation: string;
}

export interface File {
    id: string;
    uri: string;
    title: string;
    userId: string;
    createdAt: Date;
}

export interface Content {
    id: string;
    userId: string;
    fileId: string;
    title: string;
    difficulty: Difficulty;
    type: ContentTypes;
    outOfScope: boolean;
    numberOfItems: number;
    content: QuizQuestion[] | Flashcard[];
    createdAt: Date;
    updatedAt: Date;
}

export interface JobData {
    fileUrl: string;
    numberOfItems: number;
    difficulty: Difficulty;
    outOfScope: boolean;
    type: ContentTypes;
}
