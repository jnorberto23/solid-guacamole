import {create} from 'zustand';

type QuizQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

interface QuestionsState {
  questions: QuizQuestion[];
  setQuestions: (questions: QuizQuestion[]) => void;
}

export const useQuestionsStore = create<QuestionsState>()(set => ({
  questions: [],
  setQuestions: (questions: QuizQuestion[]) =>
    set({
      questions: questions,
    }),
}));
