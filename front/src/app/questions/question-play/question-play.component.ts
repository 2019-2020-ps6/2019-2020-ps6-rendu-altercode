import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MatDialog} from '@angular/material/dialog';
import {PopUpComponent} from './pop-up/pop-up.component';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {Quiz} from '../../../models/quiz.model';
import {QuizStat} from '../../../models/quizStat.model';

export interface DialogData {
  questionString: string;
  reponseString: string;
  quizStat: QuizStat;
}

@Component({
  selector: 'app-question-play',
  templateUrl: './question-play.component.html',
  styleUrls: ['./question-play.component.scss']
})

export class QuestionPlayComponent implements OnInit {
  private i;
  public clicked = false;
  @Input()
  question: Question;
  @Input()
  index: number;
  @Input()
  patient: Patient;
  @Input()
  quiz: Quiz;
  @Input()
  questionFinished: boolean;
  @Output()
  nextQuestionAuto: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  wrongAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();

  private ind = 0;

  @HostListener('click', ['$event.target'])
  onClick() {
    }

  constructor(private dialog: MatDialog, private patientService: PatientService) {
  }
  // Ouvre le pop-up de félicitation dans le cas d'une bonne réponse
  openDialog(i): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '600px',
      data: {questionString: this.question.label, reponseString: this.question.answers[i].value,
        quizStat: this.patient.statistics[0].quizStat[this.i]}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nextQuestionAuto.emit(true);
    });
  }

  ngOnInit() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
  }
  // Gère le nombre de missClick effectué par le patient
  decrementMissClicks() {
    this.patient.statistics[0].quizStat[this.i].nbMissClick--;
  }
  // Vérifie si la réonse choisie est juste
  checkIfGood(i, id) {
    if (this.ind !== this.index) {
      this.questionFinished = false;
      this.ind = this.index;
    }
    if (!this.questionFinished) {
      this.decrementMissClicks();
      if (this.question.answers[parseInt(i, 10)].isCorrect === true) {
        this.patient.statistics[0].quizStat[this.i].nbGoodAnswer++;
        const monInput = document.getElementById(id);
        monInput.style.setProperty('background-color', '#218838');
        this.openDialog(i);
        this.questionFinished = true;
      } else {
        this.patient.statistics[0].quizStat[this.i].nbWrongAnswer++;
        const monInput = document.getElementById(id);
        monInput.style.setProperty('background-color', '#CACACA');
        monInput.removeEventListener('click', onclick, true);
        this.wrongAnswer.emit(true);
      }
    }
  }
}

