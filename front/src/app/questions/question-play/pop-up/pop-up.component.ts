import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../question-play.component';

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
  // Gère le nombre de missclick d'un patient
  @HostListener('click', ['$event.target'])
  onClick() {
    this.data.quizStat.nbMissClick++;
  }

  onNoClick(): void {
    this.data.quizStat.nbMissClick--;
    this.dialogRef.close(this.timer);
  }

  ngOnInit() {
    this.startTimer();
  }
  // Lance le timer pour fermer le pop-up dans le cas où le patient ne fait rien
  startTimer() {
    this.timer = setTimeout(() => {
      this.dialogRef.close();
    }, 10000);
  }
  // Supprime le timer si le patient n'attend pas le timer pour passer à la suite
  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
