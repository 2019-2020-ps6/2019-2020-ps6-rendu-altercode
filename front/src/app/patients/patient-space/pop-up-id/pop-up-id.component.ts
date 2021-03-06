import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Admin} from '../../../../models/admin.model';
import {AdminService} from '../../../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pop-up-id',
  templateUrl: './pop-up-id.component.html',
})
export class PopUpIdComponent {
  public connectForm: FormGroup;
  public adminList: Admin[] = [];

  // tslint:disable-next-line:max-line-length
  constructor(public formBuilder: FormBuilder, public adminService: AdminService, public router: Router, public dialogRef: MatDialogRef<PopUpIdComponent>) {
    this.adminService.setAdminFromUrl();
    this.adminService.admins$.subscribe((admin) => this.adminList = admin);
    this.connectForm = this.formBuilder.group({
      connectId: [''],
      pwd: [''],
    });
  }

  tryConnect() {
    const adminToConnect: Admin = this.connectForm.getRawValue() as Admin;
    for (const admin of this.adminList) {
      if (admin.connectId === adminToConnect.connectId && admin.pwd === adminToConnect.pwd) {
        const input = document.getElementById('deco');
        input.style.setProperty('visibility', 'visible');
        this.router.navigate(['/patient-list']);
        this.dialogRef.close();
      }
    }
  }
}
