import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Patient, Style} from '../models/patient.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {Statistics} from '../models/statistics.model';
import {QuizStat} from '../models/quizStat.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patients: Patient[];
  public patients$: BehaviorSubject<Patient[]> = new BehaviorSubject(this.patients);
  public patientSelected$: Subject<Patient> = new Subject();
  private httpOptions = httpOptionsBase;
  private patientUrl = serverUrl + '/patients';
  private statUrl = 'statistics';
  private quizStatUrl = 'quizStat';

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
    const urlWithId = this.patientUrl + '/' + patientId;
    this.http.put<Patient>(urlWithId, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  updateQuizzes(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/quizzes';
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

  deleteStat(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + patient.statistics[0].id;
    this.deleteAllQuizStats(patient, patient.statistics[0]);
    this.http.delete<Statistics>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  deleteAllQuizStats(patient: Patient, stat: Statistics) {
    const quizStatUrl = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/';
    const lgth = stat.quizStat.length;
    for (let i = lgth - 1; i >= 0 ; i--) {
      const quizStatUrl2 = quizStatUrl + stat.quizStat[i].id;
      this.http.delete<QuizStat>( quizStatUrl2, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
    }
  }

  deleteQuizStat(patient: Patient, stat: Statistics, quizId: string) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/';
    const index = patient.statistics[0].quizStat.findIndex( (element) => element.quizId === quizId);
    this.http.delete<QuizStat>( urlWithId + patient.statistics[0].quizStat[index].id, this.httpOptions)
      .subscribe(() => this.setPatientsFromUrl());
  }

  updateQuizStat(quizStat: QuizStat, patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + patient.statistics[0].id + '/quizStat/' + quizStat.id;
    this.http.put<QuizStat>(urlWithId, quizStat, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }

  addQuizStat(patient: Patient, stat: Statistics, quizId: string) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/' + quizId;
    this.http.post<QuizStat>(urlWithId, this.httpOptions).subscribe( () => this.setPatientsFromUrl());
  }
}
