import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizList: Quiz[] = [];
  public mode: string;

  constructor(public quizService: QuizService, public router: Router) {
    this.quizService.quizzes$.subscribe((quiz) => this.quizList = quiz);
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    if (this.router.url.includes('patient-quiz')) {
      console.log('Nous sommes dans l écran de gestion des quiz.');
      this.mode = 'patient-quiz';
    } else if (this.router.url.includes('quiz-list')) {
      console.log('Nous sommes dans l écran de la liste des quiz.');
      this.mode = 'quiz-list';
    }
  }

  quizSelected(quizSelected: Quiz) {

  }

  deleteQuiz(quiz: Quiz) {
    console.log(quiz);
    this.quizService.deleteQuestions(quiz);
    this.quizService.deleteQuiz(quiz);
  }
}
