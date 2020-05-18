import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { Quiz } from '../../../models/quiz.model';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Question} from '../../../models/question.model';
import {PatientService} from '../../../services/patient.service';
import {Patient} from '../../../models/patient.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit, OnDestroy {
  timer;
  interval;
  private colorP;
  private colorB;
  private heightString;
  public quiz: Quiz;
  public patient: Patient;
  public questions: Question[];
  index = 0;
  private i;
  public s = 15;
  public displayTimer = false;
  public wrongA = false;
  public questionFinished = false;

  // Place un écouteur sur la page pour gérer les missclick d'un patient
  @HostListener('click', ['$event.target'])
  onClick() {
    this.incrementMissClicks();
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
  }

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService, public patientService: PatientService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.patientService.patientSelected$.subscribe((patient) => {
      this.patient = patient;
      this.colorP = this.patient.style[0].colorPolice;
      this.colorB = this.patient.style[0].colorBody;
      document.documentElement.style.setProperty('--bodyCouleur', this.colorB);
      document.documentElement.style.setProperty('--couleur', this.colorP);
      this.changeSize();
    });
  }

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('quizId');
    this.quizService.setSelectedQuiz(quizId);
    const patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.setSelectedPatient(patientId);
  }
  // Passe à la question suivante ou à la page de fin de quiz
  nextQuestion() {
     this.decrementMissClicks();
     if (this.index < this.quiz.questions.length - 1) {
       clearInterval(this.interval);
       this.displayTimer = false;
       this.s = 15;
       this.questionFinished = false;
       this.wrongA = false;
       this.index++;
    } else {
       clearInterval(this.interval);
       this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
       this.patient.statistics[0].quizStat[this.i].nbQuizDone += 1;
       this.updateStats();
       this.router.navigate(['/patient/' + this.patient.id + '/play-quiz/' + this.quiz.id + '/success-page']);
    }
  }
  // Passe à la question automatiquement si le patient ne fait rien pendant un certains temps
  nextQuestionAuto(bool: boolean) {
    if (this.index === this.quiz.questions.length - 1) {
      const button = document.getElementById('button-end');
      button.style.setProperty('visibility', 'visible');
    }
    this.displayTimer = true;
    this.startTimer();
  }

  wrongAnswer(bool: boolean) {
    this.wrongA = bool;
  }
  // Lance le timer après une bonne réponse pour passer à la question suivante automatiquement
  startTimer() {
    const ind = this.index;
    this.interval = setInterval(() => { this.s -= 1; }, 1000);
    this.timer = setTimeout(() => {
      if (this.index === ind ) {
        this.displayTimer = false;
        this.s = 15;
        clearInterval(this.interval);
        this.nextQuestion();
      }
    }, 15000);
  }
  // Supprime le timer
  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  // Met à jour les statistiques à la fin d'un quiz
  endQuiz() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbQuizDone += 1;
    this.updateStats();
  }
  // Met à jour les statistiques d'un patient
  updateStats() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbQuizTry += 1;
    if (this.patient.statistics[0].quizStat[0].nbMissClick < 0) {
      this.patient.statistics[0].quizStat[0].nbMissClick = 0;
    }
    this.patientService.updateQuizStat(this.patient.statistics[0].quizStat[this.i], this.patient);
  }

  incrementMissClicks() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbMissClick++;
  }
  decrementMissClicks() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbMissClick--;
  }
  // Modifie la taille de la police selon la config visuelle
  changeSize() {
    let height = this.patient.style[0].heightPolice;
    if (height === 0) {
      height = 1;
    } else {
      height = 1 + height / 10;
    }
    this.heightString = height.toString() + 'rem';
    document.documentElement.style.setProperty('--heightPolice', this.heightString);
  }
}

