import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-question-detail-template',
  templateUrl: './question-detail-template.component.html',
  styleUrls: ['./question-detail-template.component.css'],
})
export class QuestionDetailTemplateComponent implements OnInit {
  @Input() question?: any;
  @Input() isAns?: Boolean;
  @Input() isLiked?: Boolean;
  @Input() isLikedByUser?: Boolean;
  @Input() isAnsByCurrentUser?: Boolean;
  @Input() isQueByCurrentUser?: Boolean;

  @Input() totalAnswers?: number;
  @Input() numberOfLikes?: number;

  @Output() likeButtonClicked: EventEmitter<string> = new EventEmitter();
  @Output() unlikeButtonClicked: EventEmitter<string> = new EventEmitter();

  //ICONS
  farHeart = farHeart;
  fasHeart = fasHeart;
  faEdit = faEdit;

  constructor() {}

  ngOnInit(): void {
  }
  likeButton() {
    this.likeButtonClicked.emit(this.question?._id);
  }
  unlikeButton() {
    this.unlikeButtonClicked.emit(this.question._id);
  }
}
