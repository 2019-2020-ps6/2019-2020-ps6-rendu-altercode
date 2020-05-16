import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../../../models/patient.model';
import {PatientService} from '../../../../services/patient.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {PopUpVerifComponent} from './PopupVerif/pop-up.component';
import {Router} from '@angular/router';

export interface DialogData {
  name: string;
  result: boolean;
}

@Component({
  selector: 'app-patient-infos',
  templateUrl: './patient-infos.component.html',
  styleUrls: ['./patient-infos.component.scss']
})
export class PatientInfosComponent implements OnInit {

  public patient: Patient;
  public age;
  private result;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private patientService: PatientService, public router: Router) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.age = this.getAge(patient);
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
  }

  getAge(patient: Patient) {
    const date1 = new Date();
    const date2 = new Date(patient.date);
    return ((date1.getTime() - date2.getTime()) / 31536000000).toFixed(0);
  }

  openPop(): void {
      const dialogRef = this.dialog.open(PopUpVerifComponent, {
        width: '250px',
        data: {name: 'le patient'}
      });
      dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.deletePatient();
    });
  }

  deletePatient() {
    if (this.result) {
      this.patientService.deleteStyle(this.patient);
      this.patientService.deleteStat(this.patient);
      this.patientService.deletePatient(this.patient);
      this.router.navigate(['/patient-list']);
    } else {
    }
  }
}

