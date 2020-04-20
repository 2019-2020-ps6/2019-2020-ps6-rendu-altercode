import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Patient, Style} from '../models/patient.model';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: Patient[];
  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(this.patients);
  public patientSelected$: Subject<Patient> = new Subject();
  private httpOptions = httpOptionsBase;
  private patientUrl = serverUrl + '/patients';

  constructor(private http: HttpClient) {
    this.setPatientsFromUrl();
  }

  setPatientsFromUrl() {
    this.http.get<Patient[]>(this.patientUrl).subscribe((patientList) => {
      this.patients = patientList;
      this.patients$.next(this.patients);
    });
  }

  addPatient(patient: Patient) {
    this.http.post<Patient>(this.patientUrl, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  setSelectedPatient(patientId: string) {
    const urlWithId = this.patientUrl + '/' + patientId;
    this.http.get<Patient>(urlWithId).subscribe((patient) => {
      this.patientSelected$.next(patient);
    });
  }

  deletePatient(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id;
    this.http.delete<Patient>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  updatePatient(patient: Patient, patientId: string) {
    console.log(patient);
    const urlWithId = this.patientUrl + '/' + patientId;
    this.http.put<Patient>(urlWithId, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  deleteStyle(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/styles/' + patient.style[0].id;
    this.http.delete<Style>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  updateConfig(style: Style, patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/styles/' + patient.style[0].id;
    this.http.put<Style>(urlWithId, style, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
}
