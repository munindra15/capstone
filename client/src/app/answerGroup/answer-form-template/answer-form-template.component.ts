import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-answer-form-template',
  templateUrl: './answer-form-template.component.html',
  styleUrls: ['./answer-form-template.component.css'],
})
export class AnswerFormTemplateComponent implements OnInit {
  // ICON
  faCross = faTimesCircle;

  //FORM
  saveAnswerForm!: FormGroup;

  displayStyle = 'none';

  @Input() fetchedAnswer?: any;

  @Output() formButtonClicked: EventEmitter<string> = new EventEmitter();
  @Output() deleteAnswerButtonClicked: EventEmitter<string> =
    new EventEmitter();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.saveAnswerForm = this.formBuilder.group({ text: '' });
    if (this.fetchedAnswer) {
      this.saveAnswerForm.patchValue({
        text: `${this.fetchedAnswer}`,
      });
    }
  }

  saveAnswer() {
    this.formButtonClicked.emit(this.saveAnswerForm.value);
  }

  deleteAnswer() {
    this.deleteAnswerButtonClicked.emit();
  }

  openModal() {
    this.displayStyle = 'block';
  }
  closeModal() {
    this.displayStyle = 'none';
  }
}
