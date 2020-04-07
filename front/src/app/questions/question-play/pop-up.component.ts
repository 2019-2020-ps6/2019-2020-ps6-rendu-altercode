import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from './question-play.component';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
})
export class PopUpComponent {

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('coucou');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
