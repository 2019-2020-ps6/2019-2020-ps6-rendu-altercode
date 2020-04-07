import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    this.quizService.deleteAnswers(this.quiz, question);
    this.quizService.deleteQuestion(this.quiz, question);
  }
}
