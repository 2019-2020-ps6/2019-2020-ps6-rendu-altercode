import {Component, Inject, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  questionString: string;
  reponseString: string;
}


@Component({
  selector: 'app-question-play',
  templateUrl: './question-play.component.html',
  styleUrls: ['./question-play.component.scss']
})
export class QuestionPlayComponent implements OnInit {

  questionString: string;
  reponseString: string;

  @Input()
  question: Question;

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '250px',
      data: {question: this.questionString, reponse: this.reponseString}
    });
  }

  ngOnInit() {
  }

  checkIfGood(i) {
    if (this.question.answers[i].isCorrect === true) {
      this.openDialog();
    }
  }
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
