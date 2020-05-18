import {Component, OnDestroy, OnInit} from '@angular/core';
import { Quiz } from '../../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../../services/quiz.service';
import {Question} from '../../../../models/question.model';
import {PatientService} from '../../../../services/patient.service';
import {Patient} from '../../../../models/patient.model';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit, OnDestroy {
  private colorP;
  private colorB;
  public quiz: Quiz;
  public patient: Patient;
  public questions: Question[];
  timer;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public router: Router, private quizService: QuizService, public patientService: PatientService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.colorP = this.patient.style[0].colorPolice;
      this.colorB = this.patient.style[0].colorBody;
      document.documentElement.style.setProperty('--bodyCouleur', this.colorB);
      document.documentElement.style.setProperty('--couleur', this.colorP);
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
    const patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.setSelectedPatient(patientId);
    this.startTimer();
  }

  // Créé un timer pour retourner sur le menu du jeu si le patient ne fait rien
  startTimer() {
    this.timer = setTimeout(() => {
      this.router.navigate(['/patient-space/' + this.patient.id]);
    }, 30000);
  }
  // Supprime le timer
  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

