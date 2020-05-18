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

  constructor(private http: HttpClient) {
    this.setPatientsFromUrl();
  }
  // Appelle fonction http get pour mettre à jour l'observable selon l'url
  setPatientsFromUrl() {
    this.http.get<Patient[]>(this.patientUrl).subscribe((patientList) => {
      this.patients = patientList;
      this.patients$.next(this.patients);
    });
  }
  // Appelle fonction http post pour créer un nouveau patient
  addPatient(patient: Patient) {
    this.http.post<Patient>(this.patientUrl, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http get pour mettre à jour l'observable du patient sélectionné
  setSelectedPatient(patientId: string) {
    const urlWithId = this.patientUrl + '/' + patientId;
    this.http.get<Patient>(urlWithId).subscribe((patient) => {
      this.patientSelected$.next(patient);
    });
  }
  // Appelle fonction http delete pour supprimer un patient
  deletePatient(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id;
    this.http.delete<Patient>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http update pour modifier les informations d'un patient
  updatePatient(patient: Patient, patientId: string) {
    const urlWithId = this.patientUrl + '/' + patientId;
    this.http.put<Patient>(urlWithId, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http update pour modifier l'attribut quizzes d'un patient
  updateQuizzes(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/quizzes';
    this.http.put<Patient>(urlWithId, patient, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http delete pour supprimer un style donné
  deleteStyle(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/styles/' + patient.style[0].id;
    this.http.delete<Style>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http update pour modifier la configuration visuelle d'un patient
  updateConfig(style: Style, patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/styles/' + patient.style[0].id;
    this.http.put<Style>(urlWithId, style, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http delete pour supprimer les statistiques d'un patient
  deleteStat(patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + patient.statistics[0].id;
    this.deleteAllQuizStats(patient, patient.statistics[0]);
    this.http.delete<Statistics>(urlWithId, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http delete pour supprimer toutes les statistiques de tous les quiz selon un patient
  deleteAllQuizStats(patient: Patient, stat: Statistics) {
    const quizStatUrl = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/';
    const lgth = stat.quizStat.length;
    for (let i = lgth - 1; i >= 0 ; i--) {
      const quizStatUrl2 = quizStatUrl + stat.quizStat[i].id;
      this.http.delete<QuizStat>( quizStatUrl2, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
    }
  }
  // Appelle fonction http delete pour supprimer les statistiques d'un quiz selon un patient
  deleteQuizStat(patient: Patient, stat: Statistics, quizId: string) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/';
    const index = patient.statistics[0].quizStat.findIndex( (element) => element.quizId === quizId);
    this.http.delete<QuizStat>( urlWithId + patient.statistics[0].quizStat[index].id, this.httpOptions)
      .subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http put pour modifier les statistiques d'un quiz selon un patient
  updateQuizStat(quizStat: QuizStat, patient: Patient) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + patient.statistics[0].id + '/quizStat/' + quizStat.id;
    this.http.put<QuizStat>(urlWithId, quizStat, this.httpOptions).subscribe(() => this.setPatientsFromUrl());
  }
  // Appelle fonction http post pour créer une statistique d'un quiz selon un patient
  addQuizStat(patient: Patient, stat: Statistics, quizId: string) {
    const urlWithId = this.patientUrl + '/' + patient.id + '/statistics/' + stat.id + '/quizStat/' + quizId;
    this.http.post<QuizStat>(urlWithId, this.httpOptions).subscribe( () => this.setPatientsFromUrl());
  }
}
