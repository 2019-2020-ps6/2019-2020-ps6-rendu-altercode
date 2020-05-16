import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;


  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);
  public quizSelected$: Subject<Quiz> = new Subject();
  public questionSelected$: Subject<Question> = new Subject();
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private answerPath = 'answers';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient) {
    this.setQuizzesFromUrl();
  }

  setQuizzesFromUrl() {
    this.http.get<Quiz[]>(this.quizUrl).subscribe((quizList) => {
      this.quizzes = quizList;
      this.quizzes$.next(this.quizzes);
    });
  }


  addQuiz(quiz: Quiz) {
    this.http.post<Quiz>(this.quizUrl, quiz, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  setSelectedQuiz(quizId: string) {
    const urlWithId = this.quizUrl + '/' + quizId;
    this.http.get<Quiz>(urlWithId).subscribe((quiz) => {
      this.quizSelected$.next(quiz);
    });
  }

  setSelectedQuestion(quizId: string, questionId: string) {
    const urlWithId = this.quizUrl + '/' + quizId + '/' + this.questionsPath + '/' + questionId;
    this.http.get<Question>(urlWithId).subscribe((question) => {
      this.questionSelected$.next(question);
    });
  }

  deleteQuiz(quiz: Quiz) {
    const urlWithId = this.quizUrl + '/' + quiz.id;
    this.http.delete<Quiz>(urlWithId, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
  }

  addQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath;
    this.http.post<Question>(questionUrl, question, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  deleteQuestion(quiz: Quiz, question: Question) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id;
    this.http.delete<Question>(questionUrl, this.httpOptions).subscribe(() => this.setSelectedQuiz(quiz.id));
  }

  updateQuestion(quiz: Quiz, question: Question, questionId: string) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + questionId;
    this.http.put<Question>(questionUrl, question, this.httpOptions).subscribe( () => this.setSelectedQuiz(quiz.id));
  }

  updateAnswer(answer: Answer, question: Question, quiz: Quiz, answerId: string) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/' + answerId;
    this.http.put<Answer>(answerUrl, answer, this.httpOptions).subscribe( () => {
      this.setSelectedQuiz(quiz.id);
      this.setSelectedQuestion(quiz.id, question.id);
    });
  }

  addAnswer(answer: Answer, question: Question, quiz: Quiz) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/';
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => {
      this.setSelectedQuiz(quiz.id);
      this.setSelectedQuestion(quiz.id, question.id);
    });
  }

  deleteQuestions(quiz: Quiz) {
    const questionUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/';
    const lgth = quiz.questions.length;
    console.log('deleteQuestions  lgth : ' + lgth + ' quiz ' + quiz);
    for (let i = lgth - 1; i >= 0 ; i--) {
      this.deleteAnswers(quiz, quiz.questions[i]);
      this.http.delete<Question>(questionUrl + quiz.questions[i].id, this.httpOptions).subscribe(() => this.setQuizzesFromUrl());
    }
    console.log('Good delete question');
  }

  deleteAnswers(quiz: Quiz, question: Question) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/';
    const lgth = question.answers.length;
    for (let i = lgth - 1; i >= 0 ; i--) {
      this.http.delete<Answer>( answerUrl + question.answers[i].id, this.httpOptions).subscribe(() => {
        this.setQuizzesFromUrl();
        this.setSelectedQuestion(quiz.id, question.id);
      });
    }
    console.log('Good delete answer');
  }

  deleteAnswer(quiz: Quiz, question: Question, answer: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/' + answer.id;
    this.http.delete<Answer>( answerUrl, this.httpOptions).subscribe(() => {
      this.setQuizzesFromUrl();
      this.setSelectedQuestion(quiz.id, question.id);
    });

  }
}
