import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Admin} from '../../models/admin.model';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public connectForm: FormGroup;
  public adminList: Admin[] = [];

  constructor(public formBuilder: FormBuilder, public adminService: AdminService, public router: Router) {
    this.adminService.admins$.subscribe((admin) => this.adminList = admin);
    this.connectForm = this.formBuilder.group({
      connectId: [''],
      pwd: [''],
    });
  }

  ngOnInit() {
    this.adminService.getAdmins();
  }

  tryConnect() {
    const adminToConnect: Admin = this.connectForm.getRawValue() as Admin;
    for (const admin of this.adminList) {
      console.log(admin.connectId + ' ' + admin.pwd);
      console.log(adminToConnect.connectId + ' ' + adminToConnect.pwd);
      if (admin.connectId === adminToConnect.connectId && admin.pwd === adminToConnect.pwd) {
        this.router.navigate(['/quiz-list']);
      }
    }
  }
}

