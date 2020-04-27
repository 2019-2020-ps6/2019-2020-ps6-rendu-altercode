import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz.model';
import { Patient } from '../../models/patient.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../services/patient.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PopUpIdComponent} from './pop-up-id/pop-up-id.component';

@Component({
  selector: 'app-patient-space',
  templateUrl: './patient-space.html',
  styleUrls: ['./patient-space.scss']
})
export class PatientSpaceComponent implements OnInit {
  private colorP;
  private colorB;
  private heightP;
  public quizListTot: Quiz[] = [];
  public quizList: Quiz[] = [];
  public isChecked: boolean;
  public patient: Patient;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private route: ActivatedRoute, public quizService: QuizService, public router: Router, public patientService: PatientService) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizListTot = quiz;
    });
    this.patientService.patientSelected$.subscribe( (patient) => {
      this.patient = patient;
      this.colorP = this.patient.style[0].colorPolice;
      this.colorB = this.patient.style[0].colorBody;
      document.documentElement.style.setProperty('----bodyCouleur', this.colorB);
      document.documentElement.style.setProperty('--couleur', this.colorP);
      this.changeSize();

      this.quizListTot.forEach( (x1) => {
        if (this.patient.quizzes.indexOf(x1.id) !== -1) {
          this.quizList.push(x1);
        }
      });
    });
  }


  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
  }

  openPop() {
    const dialogRef = this.dialog.open(PopUpIdComponent, {
      width: '400px',
      data: {}
    });
  }

  startQuiz(quiz: Quiz) {
    const i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === quiz.id);
    console.log(this.patient.statistics[0].quizStat[i].nbQuizTry);
    this.patient.statistics[0].quizStat[i].nbQuizTry += 1;
    this.patientService.updateQuizStat(this.patient.statistics[0].quizStat[i], this.patient);
  }

  changeSize() {
    let height = this.patient.style[0].heightPolice;
    if (height === 0) {
      height = 1;
    } else {
      height = 1 + height / 10;
    }
    const heightString = height.toString() + 'rem';
    document.documentElement.style.setProperty('--heightPolice', heightString);
  }
}
