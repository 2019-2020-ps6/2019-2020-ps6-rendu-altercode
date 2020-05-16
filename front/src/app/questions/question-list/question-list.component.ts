import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';
import {PopUpVerifComponent} from '../../patients/patient-profile/patient-infos/PopupVerif/pop-up.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from "@angular/router";
import {QuestionsService} from "../../../services/questions.services";
import {AnswersService} from "../../../services/answers.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  private result;

  constructor(public dialog: MatDialog, private quizService: QuizService, private questionsService: QuestionsService, private answersService: AnswersService) { }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    if (this.result) {
      this.answersService.deleteAnswers(this.quiz, question);
      this.questionsService.deleteQuestion(this.quiz, question);
    }
  }

  openPop(question: Question): void {
    const dialogRef = this.dialog.open(PopUpVerifComponent, {
      width: '250px',
      data: { name: 'la question'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.deleteQuestion(question);
    });
  }
}
