git pushexport interface Answer {
    id: string;
    type?: string;
    value: string;
    isCorrect: boolean;
    urlImg: string;
}

export interface Question {
    id: string;
    label: string;
    urlImgQ: string;
    answers: Answer[];
}
