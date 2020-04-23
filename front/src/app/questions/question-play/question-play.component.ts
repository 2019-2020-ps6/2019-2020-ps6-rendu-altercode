import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
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
  @Input()
  index: number;
  @Output()
  nextQuestionAuto: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private dialog: MatDialog) {
  }

  openDialog(i): void {
    const dialogRef = this.dialog.open(PopUpComponent, {
      width: '450px',
      data: {questionString: this.question.label, reponseString: this.question.answers[i].value}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.nextQuestionAuto.emit(true);
    });
  }

  ngOnInit() {
  }

  checkIfGood(i, id) {
    if (this.question.answers[parseInt(i, 10)].isCorrect === true) {
      const monInput = document.getElementById(id);
      monInput.style.setProperty('background-color', '#218838');
      this.openDialog(i);
    } else {
      const monInput = document.getElementById(id);
      monInput.parentNode.removeChild(monInput);
    }
  }
}

