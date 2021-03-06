import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule} from './app.routing.module';

import { AppComponent } from './app.component';
import { QuizListComponent } from './quizzes/quiz-list/quiz-list.component';
import { QuizComponent } from './quizzes/quiz/quiz.component';
import { HeaderComponent } from './header/header.component';
import { QuizFormComponent } from './quizzes/quiz-form/quiz-form.component';
import {HttpClientModule} from '@angular/common/http';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { PlayQuizComponent } from './quizzes/play-quiz/play-quiz.component';
import { QuestionPlayComponent } from './questions/question-play/question-play.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './questions/question-play/pop-up/pop-up.component';
import { PopUpDecVerifComponent} from './header/pop-up-dec/pop-up-dec.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import {PatientFormComponent} from './patients/patient-form/patient-form.component';
import {PatientListComponent} from './patients/patient-list/patient-list.component';
import {PatientStyleComponent} from './patients/patient-profile/patient-style/patient-style.component';
import {PatientInfosComponent} from './patients/patient-profile/patient-infos/patient-infos.component';
import {PatientStatComponent} from './patients/patient-profile/patient-stat/patient-stat.component';
import {PatientProfileComponent} from './patients/patient-profile/patient-profile.component';
import {EditPatientComponent} from './patients/edit-patient/edit-patient.component';
import {CreateAdminComponent} from './home/create-admin/create-admin.component';
import {PopUpVerifComponent} from './patients/patient-profile/patient-infos/PopupVerif/pop-up.component';
import {PatientSpaceComponent} from './patients/patient-space/patient-space.component';
import {PopUpIdComponent} from './patients/patient-space/pop-up-id/pop-up-id.component';
import {SuccessPageComponent} from './quizzes/play-quiz/success-page/success-page.component';
import {EditQuestionComponent} from './questions/edit-question/edit-question.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizComponent,
    HeaderComponent,
    QuizFormComponent,
    EditQuizComponent,
    QuestionComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuestionPlayComponent,
    PlayQuizComponent,
    PopUpComponent,
    PopUpVerifComponent,
    PopUpIdComponent,
    HomeComponent,
    PatientFormComponent,
    PatientListComponent,
    PatientStyleComponent,
    PatientInfosComponent,
    PatientStatComponent,
    PatientProfileComponent,
    EditPatientComponent,
    CreateAdminComponent,
    PatientSpaceComponent,
    SuccessPageComponent,
    EditQuestionComponent,
    PopUpDecVerifComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  entryComponents: [
    PopUpComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
