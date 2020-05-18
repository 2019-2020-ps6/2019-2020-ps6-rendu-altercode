import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {httpOptionsBase, serverUrl} from '../configs/server.config';
import {Admin} from '../models/admin.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private admins: Admin[];
  public admins$: BehaviorSubject<Admin[]> = new BehaviorSubject(this.admins);
  private adminUrl = serverUrl + '/admins';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {

  }
  // Appelle la fonction http post pour créer un nouvel admin
  addAdmin(admin: Admin) {
    this.http.post<Admin>(this.adminUrl, admin, this.httpOptions).subscribe(() => this.setAdminFromUrl());
  }
  // Appelle la fonction http get pour mettre à jour l'observable
  setAdminFromUrl() {
    this.http.get<Admin[]>(this.adminUrl).subscribe((adminList) => {
      this.admins = adminList;
      this.admins$.next(this.admins);
    });
  }
}
