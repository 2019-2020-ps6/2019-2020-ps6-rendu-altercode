import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';
import {Patient} from '../../../../models/patient.model';


@Component({
  selector: 'app-patient-stat',
  templateUrl: './patient-stat.component.html',
  styleUrls: ['./patient-stat.component.scss']
})
export class PatientStatComponent implements OnInit {
  public patient: Patient;
  public color;

  constructor(public router: Router, public patientService: PatientService) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.color = this.patient.style[0].colorPolice;
      document.documentElement.style.setProperty('--couleur', this.color);
    });
    }

  ngOnInit() {

  }
}

