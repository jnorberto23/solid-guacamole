import {create} from 'zustand';

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
  isCorrect: boolean;
}

interface QuestionData {
  description: string;
  answers: AnswerData[];
}

interface QuestionsState {
  questions: QuestionData[];
  correctQuestionsCount: number;
  setCorrectQuestionsCount: () => void;
  setQuestions: (questions: QuizQuestion[]) => void;
}
export const useQuestionsStore = create<QuestionsState>((set) => ({
  questions: [],
  correctQuestionsCount: 0, // Inicialize com 0
  setQuestions: (questions: QuizQuestion[]) =>
    set({
      questions: questions.map((question) => {
        const answers: AnswerData[] = [
          {
            key: Math.random().toString(),
            text: question.correct_answer,
            isCorrect: true,
          },
          ...question.incorrect_answers.map((answer) => ({
            key: Math.random().toString(),
            text: answer,
            isCorrect: false,
          })),
        ];

        answers.sort(() => Math.random() - 0.5);

        return {
          description: question.question,
          answers,
        };
      }),
    }),
  setCorrectQuestionsCount: () =>
    set((state) => ({ correctQuestionsCount: state.correctQuestionsCount + 1 })),
}));