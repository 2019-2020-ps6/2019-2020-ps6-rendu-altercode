import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Admin} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pop-up-id',
  templateUrl: './pop-up-id.component.html',
})
export class PopUpIdComponent {
  public connectForm: FormGroup;
  public adminList: Admin[] = [];

  constructor(public formBuilder: FormBuilder, public adminService: AdminService, public router: Router, public dialogRef: MatDialogRef<PopUpIdComponent>) {
    this.adminService.getAdmins()
    this.adminService.admins$.subscribe((admin) => this.adminList = admin);
    this.connectForm = this.formBuilder.group({
      connectId: [''],
      pwd: [''],
    });
  }

  tryConnect() {
    const adminToConnect: Admin = this.connectForm.getRawValue() as Admin;
    for (const admin of this.adminList) {
      console.log(admin.connectId + ' ' + admin.pwd);
      console.log(adminToConnect.connectId + ' ' + adminToConnect.pwd);
      if (admin.connectId === adminToConnect.connectId && admin.pwd === adminToConnect.pwd) {
        this.router.navigate(['/patient-list']);
        this.dialogRef.close();
      }
    }
  }

  goCreate() {
    this.router.navigate(['/createAdmin']);
  }
}
