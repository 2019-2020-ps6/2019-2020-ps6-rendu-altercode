import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  public quizForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public quizService: QuizService) {
    // Form creation
    this.quizForm = this.formBuilder.group({
      name: ['', Validators.required],
      urlImg: [''],
    });
  }

  ngOnInit() {
  }

  addQuiz() {
    if (this.quizForm.valid) {
      const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
      if (quizToCreate.urlImg === '') {
        // tslint:disable-next-line:max-line-length
        quizToCreate.urlImg = 'https://images.clipartlogo.com/files/istock/previews/1015/101577815-quiz-sign-icon-questions-and-answers-game.jpg';
      }
      quizToCreate.questions = [];
      this.quizService.addQuiz(quizToCreate);
    }
  }

}
