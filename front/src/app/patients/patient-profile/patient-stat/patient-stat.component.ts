import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';
import {Patient} from '../../../../models/patient.model';
import {QuizService} from '../../../../services/quiz.service';
import {Quiz} from "../../../../models/quiz.model";
import {element} from "protractor";


@Component({
  selector: 'app-patient-stat',
  templateUrl: './patient-stat.component.html',
  styleUrls: ['./patient-stat.component.scss']
})
export class PatientStatComponent implements OnInit {
  public patient: Patient;
  public color;
  public stat;
  public nbTotDone = 0;
  public quizList: Quiz[] = [];

  constructor(public router: Router, public patientService: PatientService, private route: ActivatedRoute, public quizService: QuizService) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.stat = patient.statistics[0].quizStat;
      this.stat.forEach((stat) => {
        this.nbTotDone = this.nbTotDone + stat.nbQuizDone;
      });
    });
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
  }

  nomById(id) {
    return this.quizList.find(le => le.id === id).name;
  }
}

