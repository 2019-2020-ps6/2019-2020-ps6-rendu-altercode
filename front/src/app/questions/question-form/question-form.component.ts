import { Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Question} from '../../../models/question.model';
import {QuestionsService} from '../../../services/questions.services';
import {AnswersService} from '../../../services/answers.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})

export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;

  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private quizService: QuizService, private questionsService: QuestionsService, private answersService: AnswersService) {
    this.initializeQuestionForm();
  }
  // Initialise le formulaire de question
  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      urlImgQ: [''],
      answers: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit() {
  }
  // Récupère les infos inscrites dans les réponses crées
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }
  // Créé un formulaire pour 1 réponse
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
  // Créé une question avec les réponses
  addQuestion() {
    let conti = false;
    this.questionForm.get('answers').value.forEach(element => {
      if (element.isCorrect) {
        conti = true;
      }
    });
    if (conti) {
      if (this.questionForm.valid) {
        const question = this.questionForm.getRawValue() as Question;
        this.questionsService.addQuestion(this.quiz, question);
        this.initializeQuestionForm();
      }
    } else {
      const input = document.getElementById('need');
      input.style.setProperty('visibility', 'visible');
    }
  }
  // Supprime une réponse que l'on a voulu créé
  deleteAnswer(answers: FormArray, i: number) {
    answers.controls.splice(i, 1);
  }
}
