import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
    this.data.result = 'false';
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.data.result = 'true';
    this.dialogRef.close();
  }
}
