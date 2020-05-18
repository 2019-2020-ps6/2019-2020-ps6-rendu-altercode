import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../header.component';

@Component({
  selector: 'app-pop-up-dec-verif',
  templateUrl: './pop-up-dec.component.html',
})
export class PopUpDecVerifComponent {

  constructor(
    public dialogRef: MatDialogRef<PopUpDecVerifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  // Ferme le pop-up en envoyant ce qui a été coché
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  // Ferme le pop-up en envoyant ce qui a été coché
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
