import { Component, OnInit, Input } from '@angular/core';
import { questions } from '../../models/question.model';

@Component({
  selector: 'app-question-list-template',
  templateUrl: './question-list-template.component.html',
  styleUrls: ['./question-list-template.component.css'],
})
export class QuestionListTemplateComponent implements OnInit {
  @Input() Questions?: questions[];

  constructor() {}
  ngOnInit(): void {}
}
