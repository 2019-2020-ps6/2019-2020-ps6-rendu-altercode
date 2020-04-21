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

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public quizService: QuizService, public router: Router, public patientService: PatientService) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
    this.patientService.patientSelected$.subscribe( (patient) => this.patient = patient);
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
    if (this.router.url.includes('patient-quiz')) {
      console.log('Nous sommes dans l écran de gestion des quiz.');
      this.mode = 'patient-quiz';
    } else if (this.router.url.includes('quiz-list')) {
      console.log('Nous sommes dans l écran de la liste des quiz.');
      this.mode = 'quiz-list';
    }
  }

  checkValue(isChecked: any, quizId: string) {
    if (isChecked) {
      this.patient.quizzes.push(quizId);
    } else {
      const quiz = (element) => element === quizId;
      this.patient.quizzes.splice(this.patient.quizzes.findIndex(quiz), 1);
    }
    if (this.patient.quizzes.length === this.quizList.length) {
      this.allCheck = true;
    } else {
      this.allCheck = false;
    }
  }

  valideQuizzes() {
    this.patientService.updatePatient(this.patient, this.patient.id);
  }

  quizChecked(quiz: Quiz) {
    if (this.patient.quizzes.includes(quiz.id)) {
      return true;
    }
    return false;
  }

  quizSelected(quizSelected: Quiz) {

  }

  deleteQuiz(quiz: Quiz) {
    console.log(quiz);
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
