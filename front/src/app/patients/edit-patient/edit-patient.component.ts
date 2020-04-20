import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../../models/patient.model';
import {PatientService} from '../../../services/patient.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

  public patient: Patient;
  public patientForm: FormGroup;
  public color;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public router: Router, private patientService: PatientService) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.color = this.patient.style[0].colorPolice;
      document.documentElement.style.setProperty('--couleur', this.color);
      this.initializePatientForm();
    });
  }

  private initializePatientForm() {
    this.patientForm = this.formBuilder.group({
      name: [this.patient.name, Validators.required],
      surname: [this.patient.surname, Validators.required],
      date: [this.patient.date, Validators.required],
      urlImg: [this.patient.urlImg],
      sexe: [this.patient.sexe, Validators.required],
      pathology: [this.patient.pathology, Validators.required],
      personality: [this.patient.personality]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
  }

  updatePatient() {
    if (this.patientForm.valid) {
      const patient = this.patientForm.getRawValue() as Patient;
      this.patientService.updatePatient(patient, this.patient.id);
      this.router.navigate(['patient-infos/' + this.patient.id]);
    }
  }
}

