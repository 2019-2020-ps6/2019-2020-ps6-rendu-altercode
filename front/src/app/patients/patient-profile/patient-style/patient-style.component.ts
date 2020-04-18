import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';
import {Patient, Style} from '../../../../models/patient.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import * as $ from 'jquery';

@Component({
  selector: 'app-patient-style',
  templateUrl: './patient-style.component.html',
  styleUrls: ['./patient-style.component.scss']
})
export class PatientStyleComponent implements OnInit {

  public patient: Patient;
  public configForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public router: Router, private patientService: PatientService) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.initializeConfigForm();
    });

  }

  private initializeConfigForm() {
    console.log(this.patient.style[0].colorBody);
    this.configForm = this.formBuilder.group({
      typePolice: [this.patient.style[0].typePolice, Validators.required],
      heightPolice: [this.patient.style[0].heightPolice.toString(), Validators.required],
      colorBody: [this.patient.style[0].colorBody, Validators.required],
      colorPolice: [this.patient.style[0].colorPolice, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);

    /* $(window).click( () => {
      alert('JQuery est installé');
    }); */
  }

  updateConfig() {
    if (this.configForm.valid) {
      const style = this.configForm.getRawValue() as Style;
      console.log(style);
      this.patientService.updateConfig(style, this.patient);
      this.router.navigate(['/patient-profile/' + this.patient.id]);
    }
  }
}

