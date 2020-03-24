import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  private questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.initializeQuestionForm();
  }

  initializeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: [''],
      answers: this.formBuilder.array([])
    });
  }

  get answer() {
    return this.questionForm.get('answer') as FormArray;
  }

  ngOnInit() {
  }

}
