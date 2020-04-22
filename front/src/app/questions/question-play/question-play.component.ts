import {Component, Inject, Input, OnInit} from '@angular/core';
import {Question} from '../../../models/question.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PopUpComponent} from './pop-up.component';

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
  @Input()
  question: Question;

  constructor(private dialog: MatDialog) {
  }

  openDialog(i): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '250px',
      data: {questionString: this.question.label, reponseString: this.question.answers[i].value}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

  checkIfGood(i, id) {
    if (this.question.answers[parseInt(i, 10)].isCorrect === true) {
      this.openDialog(i);
    } else {
      const monInput = document.getElementById(id);
      monInput.parentNode.removeChild(monInput);
    }
  }
}

