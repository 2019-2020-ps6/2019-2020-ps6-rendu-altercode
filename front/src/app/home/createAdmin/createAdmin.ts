import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Admin} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'createAdmin',
  templateUrl: './createAdmin.html',
  styleUrls: ['./createAdmin.scss']
})
export class CreateAdminComponent implements OnInit {
  public adminForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public adminService: AdminService) {
    this.initializeAdminForm();
  }

  private initializeAdminForm() {
    this.adminForm = this.formBuilder.group({
      connectId: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  addAdmin() {
    if (this.adminForm.valid) {
      const admin = this.adminForm.getRawValue() as Admin;
      this.adminService.addAdmin(admin);
      this.router.navigate(['']);
    }
  }
}

