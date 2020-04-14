import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../models/patient.model';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {

  public patientForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public patientService: PatientService) {
    this.initializePatientForm();
  }

  private initializePatientForm() {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      date: ['', Validators.required],
      urlImg: [''],
      sexe: ['', Validators.required],
      pathology: ['', Validators.required],
      personality: ['']
    });
  }

  ngOnInit() {

  }

  addPatient() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.getRawValue() as Patient;
      this.patientService.addPatient(patient);
      this.router.navigate(['/patient-list']);
    }
  }
}
