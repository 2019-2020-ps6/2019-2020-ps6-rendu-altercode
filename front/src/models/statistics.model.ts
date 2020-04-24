export interface Statistics {
  id: string;
  patientId: number;
  quizStat: quizStat[];
  nbMissClick: number;
  nbWrongAnswer: number;
  nbGoodAnswer: number;
}

