import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Quiz } from '../models/quiz.model';
import {HttpClient} from '@angular/common/http';
import { serverUrl, httpOptionsBase } from '../configs/server.config';
import {Answer, Question} from '../models/question.model';
import {QuizService} from './quiz.service';
import {QuestionsService} from './questions.services';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private quizUrl = serverUrl + '/quizzes';
  private questionsPath = 'questions';
  private answerPath = 'answers';
  private httpOptions = httpOptionsBase;

  constructor(private http: HttpClient, private quizService: QuizService, public questionsServices: QuestionsService) {
  }
  // Appelle fonction http put pour modifier une réponse
  updateAnswer(answer: Answer, question: Question, quiz: Quiz, answerId: string) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/' + answerId;
    this.http.put<Answer>(answerUrl, answer, this.httpOptions).subscribe( () => {
      this.quizService.setSelectedQuiz(quiz.id);
      this.questionsServices.setSelectedQuestion(quiz.id, question.id);
    });
  }
  // Appelle fonction http post pour créer une réponse
  addAnswer(answer: Answer, question: Question, quiz: Quiz) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/';
    this.http.post<Answer>(answerUrl, answer, this.httpOptions).subscribe(() => {
      this.quizService.setSelectedQuiz(quiz.id);
      this.questionsServices.setSelectedQuestion(quiz.id, question.id);
    });
  }
  // Appelle fonction http delete pour supprimer les réponses d'une question
  deleteAnswers(quiz: Quiz, question: Question) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/';
    const lgth = question.answers.length;
    for (let i = lgth - 1; i >= 0 ; i--) {
      this.http.delete<Answer>( answerUrl + question.answers[i].id, this.httpOptions).subscribe(() => {
        this.quizService.setQuizzesFromUrl();
        this.questionsServices.setSelectedQuestion(quiz.id, question.id);
      });
    }
  }
  // Appelle fonction http delete pour supprimer une réponse
  deleteAnswer(quiz: Quiz, question: Question, answer: Answer) {
    const answerUrl = this.quizUrl + '/' + quiz.id + '/' + this.questionsPath + '/' + question.id + '/' + this.answerPath
      + '/' + answer.id;
    this.http.delete<Answer>( answerUrl, this.httpOptions).subscribe(() => {
      this.quizService.setQuizzesFromUrl();
      this.questionsServices.setSelectedQuestion(quiz.id, question.id);
    });
  }

  deleteAns(quiz: Quiz) {
    quiz.questions.forEach( q => {
      this.deleteAnswers(quiz, q);
    });
  }
}
