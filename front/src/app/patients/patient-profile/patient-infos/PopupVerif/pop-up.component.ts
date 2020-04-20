import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../patient-infos.component';

@Component({
  selector: 'app-pop-up-verif',
  templateUrl: './pop-up.component.html',
})
export class PopUpVerifComponent {

  constructor(
    public dialogRef: MatDialogRef<PopUpVerifComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
