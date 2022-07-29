import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { answers } from 'src/app/models/question.model';
import { switchMap } from 'rxjs';
import { stringLength } from '@firebase/util';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css'],
})
export class AnswerComponent implements OnInit {
  // ICON
  faCross = faTimesCircle;

  isAnswerParam: boolean = false;
  questionId: any;
  answerId: any;
  question: any;
  tempData: any;
  fetchedAnswer: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.answerId = this.route.snapshot.paramMap.get('answerId');

    if (this.answerId) {
      this.isAnswerParam = true;
      this.fetchAnswer();
      //console.log(this.fetchedAnswer);
    }
    this.fetchQuestion();
  }

  saveAnswer(answer: string) {
    this.dataService.saveAnswer(this.questionId, answer).subscribe((res) => {});
    this.router.navigateByUrl(`/questions/${this.questionId}`);
  }

  setText(string: string) {
    this.fetchedAnswer = string;
  }
  saveEditedAnswer(answer: string) {
    this.dataService.modifyAnswer(this.answerId, answer).subscribe((res) => {});
    this.router.navigateByUrl(`/questions/${this.questionId}`);
  }

  deleteAnswer() {
    this.dataService
      .deleteAnswer(this.answerId, this.questionId)
      .subscribe((res) => {
        //console.log(res);
      });
    this.router.navigateByUrl(`/questions/${this.questionId}`);
  }

  fetchAnswer() {
    this.dataService.getSingleAnswer(this.answerId).subscribe(
      (data) => {
        this.fetchedAnswer = data;
        //console.log(this.fetchedAnswer.text);
      },
      (error) => {
        if (error.status === 400) {
          this.router.navigateByUrl('**');
        }
      }
    );
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
