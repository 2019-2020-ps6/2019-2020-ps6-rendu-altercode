import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Question} from '../models/question.model';
import {QuizService} from './quiz.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public questionSelected$: Subject<Question> = new Subject();
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private quizService: QuizService) {
  }
  // Appelle fonction http get pour mettre à jour l'observable selon la question sélectionnée
  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }
  // Appelle fonction http post pour créer une nouvelle question
  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.quizService.setSelectedQuiz(quiz.id));
  }
  // Appelle fonction http delete pour supprimer une question donnée
  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.quizService.setSelectedQuiz(quiz.id));
  }
  // Appelle fonction http update pour mettre à jour une question
  updateQuestion(quiz: Quiz, question: Question, questionId: string) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId;
    this.http.put<Question>(questionUrl, question, this.httpOptions).subscribe( () => this.quizService.setSelectedQuiz(quiz.id));
  }
  // Appelle fonction http delete pour supprimer toutes les questions d'un quiz donné
  deleteQuestions(quiz: Quiz) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/';
    const lgth = quiz.questions.length;
    for (let i = lgth - 1; i >= 0 ; i--) {
      // tslint:disable-next-line:max-line-length
      this.http.delete<Question>(questionUrl + quiz.questions[i].id, this.httpOptions).subscribe(() => this.quizService.setQuizzesFromUrl());
    }
  }
}
