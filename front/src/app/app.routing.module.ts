import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';
import {HomeComponent} from './home/home.component';
import {PatientListComponent} from './patients/patient-list/patient-list.component';
import {PatientFormComponent} from './patients/patient-form/patient-form.component';
import {PatientProfileComponent} from './patients/patient-profile/patient-profile.component';
import {PatientInfosComponent} from './patients/patient-profile/patient-infos/patient-infos.component';
import {EditPatientComponent} from './patients/edit-patient/edit-patient.component';
import {PatientStyleComponent} from './patients/patient-profile/patient-style/patient-style.component';

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'play-quiz/:id', component: PlayQuizComponent},
  {path: 'home', component: HomeComponent},
  {path: 'patient-list', component: PatientListComponent},
  {path: 'patient-form', component: PatientFormComponent},
  {path: 'patient-profile/:id', component: PatientProfileComponent},
  {path: 'patient-infos/:id', component: PatientInfosComponent},
  {path: 'edit-patient/:id', component: EditPatientComponent},
  {path: 'patient-style/:id', component: PatientStyleComponent},
  {path: 'patient-quiz/:id', component: QuizListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

