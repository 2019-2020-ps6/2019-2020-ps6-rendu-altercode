import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Patient} from '../../../models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @Input()
  patient: Patient;

  constructor(public router: Router) {

  }

  ngOnInit() {

  }

  getAge() {
    const date1 = new Date();
    const date2 = new Date(this.patient.date);
    return ((date1.getTime() - date2.getTime()) / 31536000000).toFixed(0);
  }
}

