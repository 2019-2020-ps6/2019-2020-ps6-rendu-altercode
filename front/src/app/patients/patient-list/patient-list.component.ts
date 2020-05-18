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

  public patientListBack: Patient[] = [];
  public patientList: Patient[] = [];

  constructor(public router: Router, public patientService: PatientService) {
    this.patientService.patients$.subscribe((patient) => {
      this.patientList = patient;
      this.patientListBack = patient;
    });
  }

  ngOnInit() {
    this.patientService.setPatientsFromUrl();
  }

  addPatient() {
    this.router.navigate(['/patient-form']);
  }
  // Calcul l'âge du patient
  getAge(patient: Patient) {
    const date1 = new Date();
    const date2 = new Date(patient.date);
    return ((date1.getTime() - date2.getTime()) / 31536000000).toFixed(0);
  }
  // Recherche le patient correspondant selon son nom et prénom
  search() {
    const MotClef = (document.getElementById('motclef') as HTMLInputElement).value.toUpperCase();
    this.patientList = this.patientListBack.slice();
    this.patientListBack.forEach(q => {
      if (!(q.name.toUpperCase().includes(MotClef)) && !(q.surname.toUpperCase().includes(MotClef))) {
        this.patientList.splice(this.patientList.indexOf(q), 1, );
      }
    });
  }
  // Réinitialise la recherche
  resetList() {
    (document.getElementById('motclef') as HTMLInputElement).value = '';
    this.patientList = this.patientListBack.slice();
  }
}

