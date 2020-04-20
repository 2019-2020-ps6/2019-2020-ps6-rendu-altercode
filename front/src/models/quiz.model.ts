import { Question } from './question.model';
import { Patient } from './patient.model';

export interface Quiz {
    id: string;
    name: string;
    urlImg: string;
    questions: Question[];
}

