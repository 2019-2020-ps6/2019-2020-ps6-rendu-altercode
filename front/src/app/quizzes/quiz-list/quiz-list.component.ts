import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Patient } from '../../../models/patient.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public mode: string;
  public isChecked: boolean;
  public patient: Patient;
  public allCheck = false;

  private quizIdForStatToAdd: string[] = [];
  private quizIdForStatToDelete: string[] = [];
  public quizzesO: string[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public quizService: QuizService, public router: Router, public patientService: PatientService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.patientService.patientSelected$.subscribe( (patient) => {
      this.patient = patient;
      this.patient.quizzes.forEach( (quizId) => {
        this.quizzesO.push(quizId);
      });
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    if (this.router.url.includes('patient-quiz')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.patientService.setSelectedPatient(id);
      this.mode = 'patient-quiz';
    } else if (this.router.url.includes('quiz-list')) {
      this.mode = 'quiz-list';
    }
  }

  checkValue(isChecked: any, quiz: Quiz) {
    if (isChecked) {
      this.quizzesO.push(quiz.id);
      this.quizIdForStatToAdd.push(quiz.id);
    } else {
      if (this.patient.quizzes.find((element) => element === quiz.id) === quiz.id) {
        this.quizIdForStatToDelete.push(quiz.id);
      }
      else {
        this.quizIdForStatToAdd.splice(this.quizIdForStatToAdd.findIndex((element) => element === quiz.id), 1);
      }
      this.quizzesO.splice(this.quizzesO.findIndex((element) => element === quiz.id), 1);
    }
    if (this.patient.quizzes.length === this.quizList.length) {
      this.allCheck = true;
    } else {
      this.allCheck = false;
    }
  }

  valideQuizzes() {
    if (this.quizIdForStatToAdd.length > 0) {
      this.quizIdForStatToAdd.forEach((quizId) => {
        this.patientService.addQuizStat(this.patient, this.patient.statistics[0], quizId);
      });
    }
    if (this.quizIdForStatToDelete.length > 0) {
      this.quizIdForStatToDelete.forEach((quizId) => {
        this.patientService.deleteQuizStat(this.patient, this.patient.statistics[0], quizId);
      });
    }
    this.patient.quizzes = this.quizzesO;
    this.patientService.updateQuizzes(this.patient);
  }
// update patient alors qu'il faut update juste le quizStat
  quizChecked(quiz: Quiz) {
    if (this.patient.quizzes.includes(quiz.id)) {
      return true;
    }
    return false;
  }

  quizSelected(quizSelected: Quiz) {

  }

  deleteQuiz(quiz: Quiz) {
    this.quizService.deleteQuestions(quiz);
    this.quizService.deleteQuiz(quiz);
  }

  checkAll() {
    if (this.allCheck) {
      this.patient.quizzes.splice(0, this.patient.quizzes.length);
      this.allCheck = false;
    } else {
      this.quizList.forEach((quiz) => {
        this.patient.quizzes.push(quiz.id);
      });
      this.allCheck = true;
    }

  }
}
