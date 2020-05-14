import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './question-play.component';

@Component({
  selector: 'app-pop-up',
  styleUrls: ['./pop-up.component.scss'],
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent implements OnInit, OnDestroy {
  timer;
  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  @HostListener('click', ['$event.target'])
  onClick() {
    this.data.quizStat.nbMissClick++;
    // console.log('Pop up ' + this.data.quizStat.nbMissClick);
  }

  onNoClick(): void {
    this.data.quizStat.nbMissClick--;
    this.dialogRef.close(this.timer);
  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setTimeout(() => {
      this.dialogRef.close();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
