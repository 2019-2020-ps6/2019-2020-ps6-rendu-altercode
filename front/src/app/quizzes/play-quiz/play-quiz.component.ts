import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../models/patient.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public patient: Patient;
  public questions: Question[];
  index = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService, public patientService: PatientService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.patientService.patientSelected$.subscribe((patient) => this.patient = patient);
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
    const patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.setSelectedPatient(patientId);
  }

  nextQuestion() {
    this.index++;
  }

}

