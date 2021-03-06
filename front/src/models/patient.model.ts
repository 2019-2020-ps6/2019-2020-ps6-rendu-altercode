import {Statistics} from './statistics.model';

export interface Style {
  id: string;
  colorBody: string;
  colorPolice: string;
  heightPolice: number;
  patientId: number;
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
  style: Style[];
  quizzes: string[];
  statistics: Statistics[];
}

