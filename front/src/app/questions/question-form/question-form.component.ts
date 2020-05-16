import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Question} from '../../../models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    this.initializeQuestionForm();
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      urlImgQ: [''],
      answers: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit() {
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer() {
    return this.formBuilder.group({
      value: ['', Validators.required],
      isCorrect: false,
      urlImg: ['']
    });
  }

  addAnswer() {
    this.answers.push(this.createAnswer());
  }

  addQuestion() {
    let conti = false;
    this.questionForm.get('answers').value.forEach(element => {
      if (element.isCorrect) {
        conti = true;
      }
    });
    console.log(conti);
    if (conti) {
      if (this.questionForm.valid) {
        const question = this.questionForm.getRawValue() as Question;
        this.quizService.addQuestion(this.quiz, question);
        this.initializeQuestionForm();
      }
    }
  }

  deleteAnswer(answers: FormArray, i: number) {
    answers.controls.splice(i, 1);
  }

}
