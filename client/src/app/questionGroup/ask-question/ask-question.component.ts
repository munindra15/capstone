import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { questionForm, questions } from 'src/app/models/question.model';
import { AuthenticationService } from '../../auth/authentication.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
})
export class AskQuestionComponent implements OnInit {
  userId: any;
  questionId: any;
  isQuestionParam: boolean = false;
  question: any;

  fetchedQuestionTitle: String = '';
  fetchedQuestionText: String = '';

  constructor(
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get(`questionId`);
    this.userId = this.authService.getUserId();
    if (this.questionId) {
      this.isQuestionParam = true;
      this.fetchQuestion();
    }
  }

  saveQuestion(form: questionForm): void {
    this.dataService.postQuestion(this.userId, form).subscribe((res) => {
      //console.log(res);
    });
    this.router.navigateByUrl('/questions');
  }

  deleteQuestion() {
    this.dataService
      .deleteQuestion(this.questionId, this.userId)
      .subscribe((res) => {
        //console.log(res);
      });
    this.router.navigateByUrl('/questions');
  }

  saveEditQuestion(form: questionForm) {
    this.dataService.editQuestion(this.questionId, form).subscribe(
      (res) => {},
      (error) => {
        if (error.status === 400) {
          this.router.navigateByUrl('**');
        }
      }
    );
    this.router.navigateByUrl(`/questions/${this.questionId}`);
  }

  fetchQuestion() {
    this.dataService.getSingleQuestion(this.questionId).subscribe(
      (data) => {
        this.question = data;
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigateByUrl('**');
        }
      }
    );
  }
}
