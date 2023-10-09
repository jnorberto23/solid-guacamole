import { create } from 'zustand';

type QuizQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

interface AnswerData {
  key: string;
  text: string;
}

interface QuestionData {
  description: string;
  answers: AnswerData[];
}

interface QuestionsState {
  questions: QuestionData[];
  setQuestions: (questions: QuizQuestion[]) => void;
}
export const useQuestionsStore = create<QuestionsState>((set) => ({
  questions: [],
  setQuestions: (questions: QuizQuestion[]) =>
    set({
      questions: questions.map((question) => {
      
        const answers: AnswerData[] = [
          { key: Math.random().toString(), text: question.correct_answer },
          ...question.incorrect_answers.map((answer) => ({
            key: Math.random().toString(),
            text: answer,
          })),
        ];

     
        answers.sort(() => Math.random() - 0.5);

        return {
          description: question.question,
          answers,
        };
      }),
    }),
}));