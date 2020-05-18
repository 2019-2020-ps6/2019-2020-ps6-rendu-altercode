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
  // Ferme le pop-up dans le cas "oui"
  onNoClick(): void {
    this.dialogRef.close(false);
  }
  // Ferme le pop-up dans le cas "non"
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
