import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PopUpComponent} from './pop-up.component';
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
  private i; private nbMissclick = 0;
  @Input()
  question: Question;
  @Input()
  index: number;
  @Input()
  patient: Patient;
  @Input()
  quiz: Quiz;
  @Output()
  nextQuestionAuto: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('click', ['$event.target'])
  onClick() {
    // console.log('Question ' + this.patient.statistics[0].quizStat[this.i].nbMissClick);
  }

  constructor(private dialog: MatDialog, private patientService: PatientService) {
     }

  openDialog(i): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '450px',
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

  incrementMissClicks() {
    this.patient.statistics[0].quizStat[this.i].nbMissClick++;
  }

  decrementMissClicks() {
    this.patient.statistics[0].quizStat[this.i].nbMissClick--;
  }

  checkIfGood(i, id) {
    this.decrementMissClicks();
    if (this.question.answers[parseInt(i, 10)].isCorrect === true) {
      this.patient.statistics[0].quizStat[this.i].nbGoodAnswer++;
      const monInput = document.getElementById(id);
      monInput.style.setProperty('background-color', '#218838');
      this.openDialog(i);
    } else {
      this.patient.statistics[0].quizStat[this.i].nbWrongAnswer++;
      const monInput = document.getElementById(id);
      monInput.parentNode.removeChild(monInput);
    }
  }
}

