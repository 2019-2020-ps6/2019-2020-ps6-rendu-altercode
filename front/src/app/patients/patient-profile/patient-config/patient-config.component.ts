import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';

@Component({
  selector: 'app-patient-config',
  templateUrl: './patient-config.component.html',
  styleUrls: ['./patient-config.component.scss']
})
export class PatientConfigComponent implements OnInit {

  constructor(public router: Router) {
  }

  ngOnInit() {

  }
}

