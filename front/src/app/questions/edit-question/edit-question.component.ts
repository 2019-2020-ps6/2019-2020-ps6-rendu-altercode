import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Question} from '../../../models/question.model';
import {Quiz} from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PopUpVerifComponent} from "../../patients/patient-profile/patient-infos/PopupVerif/pop-up.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})

export class EditQuestionComponent implements OnInit {

  @Input()
  quiz: Quiz;
  @Input()
  question: Question;

  public index = 1;
  public questionForm: FormGroup;
  private result;

  constructor(public dialog: MatDialog, public formBuilder: FormBuilder, private quizService: QuizService, private route: ActivatedRoute, public router: Router) {
    this.quizService.quizSelected$.subscribe((quiz) => {
      this.quiz = quiz;
      this.quizService.questionSelected$.subscribe((question) => {
        this.question = question;
        this.initializeQuestionForm();
        this.initializeAnswer();
        console.log(this.quiz);
        console.log(this.question);
      });
    });
  }

  private initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: [this.question.label, Validators.required],
      urlImgQ: [this.question.urlImgQ],
      answers: this.formBuilder.array([], Validators.required)
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
    const questId = this.route.snapshot.paramMap.get('id');
    this.quizService.setSelectedQuestion(quizId, questId);
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  initializeAnswer() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.question.answers.length; i++) {
      this.answers.push(this.formBuilder.group({
        value: [this.question.answers[i].value, Validators.required],
        isCorrect: this.question.answers[i].isCorrect,
        urlImg: [this.question.answers[i].urlImg],
        id: this.question.answers[i].id
      }));
    }
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

  updateQuestion() {
    let conti = false;
    this.questionForm.get('answers').value.forEach(element => {
      if (element.isCorrect) {
        conti = true;
      }
      const index = this.question.answers.findIndex((answer) => answer.id === element.id);
      if (index > -1) {
        this.quizService.updateAnswer(element, this.question, this.quiz, this.question.answers[index].id);
      } else {
        this.quizService.addAnswer(element, this.question, this.quiz);
      }
    });
    if (conti) {
      if (this.questionForm.valid) {
        const question = this.questionForm.getRawValue() as Question;
        console.log(question);
        this.quizService.updateQuestion(this.quiz, question, this.question.id);
        this.router.navigate(['/edit-quiz/' + this.quiz.id]);
      }
    } else {
        const input = document.getElementById('need');
        input.style.setProperty('visibility', 'visible');
    }
  }

  deleteAnswer(answers: FormArray, i: number) {
    if (this.result) {
      if (this.question.answers.length > i) {
        this.quizService.deleteAnswer(this.quiz, this.question, this.question.answers[i]);
      } else {
        answers.controls.splice(i, 1);
      }
    }
  }

  openPop(answers: FormArray, i: number): void {
    const dialogRef = this.dialog.open(PopUpVerifComponent, {
      width: '250px',
      data: { name: 'la réponse'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.deleteAnswer(answers, i);
    });
  }

}
