import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';
import { Patient } from '../../../models/patient.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../services/patient.service';
import {PopUpVerifComponent} from '../../patients/patient-profile/patient-infos/PopupVerif/pop-up.component';
import {MatDialog} from '@angular/material/dialog';
import {QuestionsService} from '../../../services/questions.services';
import {AnswersService} from "../../../services/answers.service";

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

  public quizListBack: Quiz[] = [];
  public quizList: Quiz[] = [];
  public mode: string;
  public patient: Patient;
  public allCheck = false;

  private quizIdForStatToAdd: string[] = [];
  private quizIdForStatToDelete: string[] = [];
  public quizzesO: string[] = [];
  private result;

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private route: ActivatedRoute, public quizService: QuizService, public router: Router, public patientService: PatientService, private questionsService: QuestionsService, private answersService: AnswersService) {
    this.quizService.quizzes$.subscribe((quiz) => {
      this.quizList = quiz;
      this.quizListBack = quiz;
    });
    this.patientService.patientSelected$.subscribe( (patient) => {
      this.patient = patient;
      this.patient.quizzes.forEach( (quizId) => {
        this.quizzesO.push(quizId);
      });
    });
  }

  ngOnInit() {
    this.quizService.setQuizzesFromUrl();
    if (this.router.url.includes('patient-quiz')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.patientService.setSelectedPatient(id);
      this.mode = 'patient-quiz';
    } else if (this.router.url.includes('quiz-list')) {
      this.mode = 'quiz-list';
    }
  }
  // Met à jour la liste correspondante selon l'action qui est faite (coche/décoche)
  checkValue(isChecked: any, quiz: Quiz) {
    // Si on coche : met à jour la liste temporaire de quiz d'un patient et la liste temporaire des quiz à ajouter au patient
    if (isChecked) {
      this.quizzesO.push(quiz.id);
      this.quizIdForStatToAdd.push(quiz.id);
    } else {
      if (this.patient.quizzes.find((element) => element === quiz.id) === quiz.id) {
        this.quizIdForStatToDelete.push(quiz.id);
      } else {
        this.quizIdForStatToAdd.splice(this.quizIdForStatToAdd.findIndex((element) => element === quiz.id), 1);
      }
      this.quizzesO.splice(this.quizzesO.findIndex((element) => element === quiz.id), 1);
    }
    this.allCheck = this.quizzesO.length === this.quizList.length;
  }

  // A pour même objectif que checkValue mais cette fois pour tous les quiz existants
  checkAll() {
    // Si on décoche tous les quiz
    if (this.allCheck) {
      this.quizzesO.splice(0, this.quizzesO.length);
      this.patient.quizzes.forEach( (quizId) => {
        this.quizIdForStatToDelete.push(quizId);
      });
      this.quizIdForStatToAdd.splice(0, this.quizIdForStatToAdd.length);
      this.allCheck = false;
    } else {
      this.quizList.forEach((quiz) => {
        if (this.quizzesO.find((element) => element === quiz.id) !== quiz.id) {
          this.quizzesO.push(quiz.id);
          this.quizIdForStatToAdd.push(quiz.id);
        }
      });
      this.allCheck = true;
    }
  }

  // Appelle les fonctions du service pour la création ou la suppression d'une stat de quiz et la mise à jour de la liste de quiz du patient
  valideQuizzes() {
    if (this.quizIdForStatToAdd.length > 0) {
      this.quizIdForStatToAdd.forEach((quizId) => {
        this.patientService.addQuizStat(this.patient, this.patient.statistics[0], quizId);
      });
    }
    if (this.quizIdForStatToDelete.length > 0) {
      this.quizIdForStatToDelete.forEach((quizId) => {
        this.patientService.deleteQuizStat(this.patient, this.patient.statistics[0], quizId);
      });
    }
    this.patient.quizzes = this.quizzesO;
    this.patientService.updateQuizzes(this.patient);
  }

  quizChecked(quiz: Quiz) {
    if (this.quizzesO.includes(quiz.id)) {
      return true;
    }
    return false;
  }

  deleteQuiz(quiz: Quiz) {
    if (this.result) {
      this.answersService.deleteAnswerss(quiz);
      this.questionsService.deleteQuestions(quiz);
      this.quizService.deleteQuiz(quiz);
    }
  }

  openPop(quiz: Quiz): void {
    const dialogRef = this.dialog.open(PopUpVerifComponent, {
      width: '250px',
      data: { name: 'le quiz'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
      this.deleteQuiz(quiz);
    });
  }

  search() {
    const MotClef = (document.getElementById('motclef') as HTMLInputElement).value.toUpperCase();
    this.quizList = this.quizList.slice();
    this.quizListBack.forEach(q => {
      if (!q.name.toUpperCase().includes(MotClef)) {
        this.quizList.splice(this.quizList.indexOf(q), 1, );
      }
    });
  }

  resetList() {
    (document.getElementById('motclef') as HTMLInputElement).value = '';
    this.quizList = this.quizListBack.slice();
  }
}
