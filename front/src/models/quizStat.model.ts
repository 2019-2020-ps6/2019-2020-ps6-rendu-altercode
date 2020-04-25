export interface QuizStat {
  id: string;
  statisticsId: string;
  quizId: string;
  nbQuizDone: number;
  nbQuizTry: number;
  nbMissClick: number;
  nbWrongAnswer: number;
  nbGoodAnswer: number;
}
