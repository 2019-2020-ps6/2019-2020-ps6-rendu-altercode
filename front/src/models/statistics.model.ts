import { QuizStat } from './quizStat.model';

export interface Statistics {
  id: string;
  patientId: number;
  quizStat: QuizStat[];
}

