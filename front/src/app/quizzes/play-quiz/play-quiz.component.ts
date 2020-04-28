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
  private colorP;
  private colorB;
  private heightString;
  public quiz: Quiz;
  public patient: Patient;
  public questions: Question[];
  index = 0;
  private i;

  @HostListener('click', ['$event.target'])
  onClick() {
    this.incrementMissClicks();
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    // console.log('Quiz ' + this.patient.statistics[0].quizStat[this.i].nbMissClick);
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

  nextQuestion() {
     this.decrementMissClicks();
     if (this.index < this.quiz.questions.length - 1) {
      this.index++;
    } else {
       this.updateStats();
       this.router.navigate(['/patient/' + this.patient.id + '/play-quiz/' + this.quiz.id + '/success-page']);
    }
  }

  nextQuestionAuto(bool: boolean) {
    if (this.index === this.quiz.questions.length - 1) {
      const button = document.getElementById('button-end');
      button.style.setProperty('visibility', 'visible');
    }
    this.startTimer();
  }

  startTimer() {
    const ind = this.index;
    this.timer = setTimeout(() => {
      if (this.index === ind ) {
        this.nextQuestion();
      }
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  endQuiz() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbQuizDone += 1;
    this.updateStats();
  }

  updateStats() {
    this.i = this.patient.statistics[0].quizStat.findIndex((element) => element.quizId === this.quiz.id);
    this.patient.statistics[0].quizStat[this.i].nbQuizTry += 1;
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

