import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../services/patient.service';
import {Patient, Style} from '../../../../models/patient.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-style',
  templateUrl: './patient-style.component.html',
  styleUrls: ['./patient-style.component.scss']
})
export class PatientStyleComponent implements OnInit {

  public patient: Patient;
  public configForm: FormGroup;
  private heightString;

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public router: Router, private patientService: PatientService) {
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.initializeConfigForm();
      this.changeColorP();
      this.changeSize();
    });
  }
  // Initialise le formulaire de configuration visuelle
  private initializeConfigForm() {
    this.configForm = this.formBuilder.group({
      heightPolice: [this.patient.style[0].heightPolice.toString(), Validators.required],
      colorPolice: [this.patient.style[0].colorPolice, Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.patientService.setSelectedPatient(id);
  }
  // Modifie la configuration visuelle du système de jeu d'un patient
  updateConfig() {
    if (this.configForm.valid) {
      const style = this.configForm.getRawValue() as Style;
      this.patientService.updateConfig(style, this.patient);
      this.router.navigate(['/patient-profile/' + this.patient.id]);
    }
  }
  // Change la taille de la police pour faire un visuelle immédiat en temps réel
  changeSize() {
      let height = parseInt(this.configForm.get('heightPolice').value, 10);
      if (height === 0) {
        height = 1;
      } else {
        height = 1 + height / 10;
      }
      this.heightString = height.toString() + 'rem';
      document.documentElement.style.setProperty('--heightPolice', this.heightString);
    }
  // Change la couleur de la police pour un effet immédiat en temps réel
    changeColorP() {
      document.documentElement.style.setProperty('--couleur', this.configForm.get('colorPolice').value);
    }
}
