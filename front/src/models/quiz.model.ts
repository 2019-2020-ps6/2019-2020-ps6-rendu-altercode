import { Question } from './question.model';

export interface Quiz {
    id: string;
    name: string;
    urlImg: string;
    questions: Question[];
}

