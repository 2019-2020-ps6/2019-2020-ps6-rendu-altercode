import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { serverUrl } from '../configs/server.config';
import {Admin} from '../models/admin.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins: Admin[];
  public admins$: BehaviorSubject<Admin[]> = new BehaviorSubject(this.admins);
  private adminUrl = serverUrl + '/admins';

  constructor(private http: HttpClient) {

  }

  getAdmins() {
    this.http.get<Admin[]>(this.adminUrl).subscribe((adminList) => {
      this.admins = adminList;
      this.admins$.next(this.admins);
    });
  }
}
