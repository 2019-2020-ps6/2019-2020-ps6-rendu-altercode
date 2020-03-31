import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';

const routes: Routes = [
  {path: 'quiz-list', component: QuizListComponent},
  {path: 'edit-quiz/:id', component: EditQuizComponent},
  {path: 'play-quiz/:id', component: PlayQuizComponent},
  {path: '', redirectTo: '/quiz-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

