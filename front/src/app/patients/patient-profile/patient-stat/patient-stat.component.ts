import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';


@Component({
  selector: 'app-patient-stat',
  templateUrl: './patient-stat.component.html',
  styleUrls: ['./patient-stat.component.scss']
})
export class PatientStatComponent implements OnInit {

  constructor(public router: Router, public patientService: PatientService) {
    }

  ngOnInit() {

  }
}

