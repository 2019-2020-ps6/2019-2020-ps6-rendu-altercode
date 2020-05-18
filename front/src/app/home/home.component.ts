import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  private input;
  @Output() admin: EventEmitter<any> = new EventEmitter();

  constructor(public formBuilder: FormBuilder, public adminService: AdminService, public router: Router) {
    this.adminService.admins$.subscribe((admin) => this.adminList = admin);
    this.connectForm = this.formBuilder.group({
      connectId: [''],
      pwd: [''],
    });
    this.input = document.getElementById('deco');
    this.input.style.setProperty('visibility', 'hidden');
  }

  ngOnInit() {
    this.adminService.setAdminFromUrl();
    this.admin.emit(true);
  }
  // Vérifie le compte inscrit et le connecte s'il est validé
  tryConnect() {
    const adminToConnect: Admin = this.connectForm.getRawValue() as Admin;
    for (const admin of this.adminList) {
      if (admin.connectId === adminToConnect.connectId && admin.pwd === adminToConnect.pwd) {
        this.input.style.setProperty('visibility', 'visible');
        this.router.navigate(['/patient-list']);
      }
    }
  }
  //  Dirige vers la page de création de compte
  goCreate() {
    this.router.navigate(['/create-admin']);
  }
}

