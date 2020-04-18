import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  public patientList: Patient[] = [];

  constructor(public formBuilder: FormBuilder, public router: Router, public patientService: PatientService) {
    this.patientService.patients$.subscribe((patient) => this.patientList = patient);
  }

  ngOnInit() {
    this.patientService.setPatientsFromUrl();
  }

  addPatient() {
    this.router.navigate(['/patient-form']);
  }

  getAge(patient: Patient) {
    const date1 = new Date();
    const date2 = new Date(patient.date);
    return ((date1.getTime() - date2.getTime()) / 31536000000).toFixed(0);
  }
}

