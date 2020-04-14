import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {

  public patient: Patient;

  constructor(private route: ActivatedRoute, private patientService: PatientService) {
    this.patientService.patientSelected$.subscribe((patient) => this.patient = patient);
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
}

