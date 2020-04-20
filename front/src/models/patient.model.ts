import {Quiz} from './quiz.model';

export interface Style {
  colorBody: string;
  colorPolice: string;
  heightPolice: number;
  id: string;
  patientId: string;
  typePolice: string;
}

export interface Patient {
  id: string;
  name: string;
  surname: string;
  date: string;
  sexe: string;
  pathology: string;
  personality: string;
  urlImg: string;
  style: Style;
  quizzes: string[];
}

