import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../models/patient.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'createAdmin',
  templateUrl: './createAdmin.html',
  styleUrls: ['./createAdmin.scss']
})
export class CreateAdminComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {

  }
}

