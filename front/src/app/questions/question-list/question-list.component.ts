import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';
import {PopUpVerifComponent} from '../../patients/patient-profile/patient-infos/PopupVerif/pop-up.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input()
  quiz: Quiz;

  private result;

  constructor(public dialog: MatDialog, private quizService: QuizService) { }

  ngOnInit() {
  }

  deleteQuestion(question: Question) {
    if (this.result) {
      this.quizService.deleteAnswers(this.quiz, question);
      this.quizService.deleteQuestion(this.quiz, question);
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
