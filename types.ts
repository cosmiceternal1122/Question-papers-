
export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  LONG_ANSWER = 'LONG_ANSWER',
  FILL_IN_BLANKS = 'FILL_IN_BLANKS'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  answer: string;
  marks: number;
}

export interface QuestionPaper {
  title: string;
  subject: string;
  grade: string;
  duration: string;
  totalMarks: number;
  instructions: string[];
  questions: Question[];
}

export interface GenerationParams {
  subject: string;
  grade: string;
  topics: string;
  difficulty: Difficulty;
  questionCount: number;
  includeAnswerKey: boolean;
}
