import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { questionForm } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-form-template',
  templateUrl: './question-form-template.component.html',
  styleUrls: ['./question-form-template.component.css'],
})
export class QuestionFormTemplateComponent implements OnInit {
  //Icons
  faCross = faTimesCircle;
  displayStyle = 'none';

  saveQuestionForm!: FormGroup;

  @Input() fetchQuestionTitle?: String;
  @Input() fetchQuestionText?: String;

  @Output() saveQuestionButtonClicked: EventEmitter<questionForm> =
    new EventEmitter();
  @Output() deleteQuestionButtonClicked = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.saveQuestionForm = this.formBuilder.group({
      title: '',
      text: '',
    });

    if (this.fetchQuestionTitle || this.fetchQuestionText) {
      this.saveQuestionForm.patchValue({
        title: `${this.fetchQuestionTitle}`,
        text: `${this.fetchQuestionText}`,
      });
    }
  }

  saveQuestion() {
    this.saveQuestionButtonClicked.emit(this.saveQuestionForm.value);
  }

  deleteQuestion() {
    this.deleteQuestionButtonClicked.emit();
  }

  openModal() {
    this.displayStyle = 'block';
  }
  closeModal() {
    this.displayStyle = 'none';
  }
}
