import {shuffleArray} from './utils';


type Questions = {
  category: string;
  correct_answer: string;
  difficuly: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Questions & {answers: []}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  Difficulty = 'difficulty'
}

export const FetchQuestions = async (
  amount: number,
  difficulty: Difficulty) =>{
  const endpoints = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await(await fetch(endpoints)).json();
  return data.results.map((question: Questions) =>({
    ...question,
    answers: shuffleArray( [
      ...question.incorrect_answers,
      question.correct_answer
    ])

  }))
}