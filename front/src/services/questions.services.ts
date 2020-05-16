import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {AnswersService} from './answers.service';
import {QuizService} from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  public questionSelected$: Subject<Question> = new Subject();
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private quizId;
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private quizService: QuizService) {
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.quizService.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.quizService.setSelectedQuiz(quiz.id));
  }

  updateQuestion(quiz: Quiz, question: Question, questionId: string) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId;
    this.http.put<Question>(questionUrl, question, this.httpOptions).subscribe( () => this.quizService.setSelectedQuiz(quiz.id));
  }

  deleteQuestions(quiz: Quiz) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/';
    const lgth = quiz.questions.length;
    console.log('deleteQuestions  lgth : ' + lgth + ' quiz ' + quiz);
    for (let i = lgth - 1; i >= 0 ; i--) {
      this.http.delete<Question>(questionUrl + quiz.questions[i].id, this.httpOptions).subscribe(() => this.quizService.setQuizzesFromUrl());
    }
    console.log('Good delete question');
  }

}
