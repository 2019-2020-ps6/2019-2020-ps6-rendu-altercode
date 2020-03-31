import { Component, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  public quiz: Quiz;
  public questions: Question[];
  private index = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuiz(id);
  }

  nextQuestion() {
    this.index++;
  }

}

