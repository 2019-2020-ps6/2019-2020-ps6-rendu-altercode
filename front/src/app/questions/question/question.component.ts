import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
  }
}
