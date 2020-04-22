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

  public quizListTot: Quiz[] = [];
  public quizList: Quiz[] = [];
  public isChecked: boolean;
  public patient: Patient;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private route: ActivatedRoute, public quizService: QuizService, public router: Router, public patientService: PatientService) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizListTot = quiz;

    });
  }


  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
    this.patientService.patientSelected$.subscribe( (patient) => {
      this.patient = patient;
      this.quizListTot.forEach( (x1) => {
        if (this.patient.quizzes.indexOf(x1.id) !== -1) {
          this.quizList.push(x1);
        }
      });
      console.log(this.quizList);
      console.log(this.quizListTot);
    });
  }

  openPop() {
    const dialogRef = this.dialog.open(PopUpIdComponent, {
      width: '250px',
      data: {}
    });
  }
}
