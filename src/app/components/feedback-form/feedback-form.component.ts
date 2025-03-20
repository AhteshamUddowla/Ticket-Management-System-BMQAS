import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { FeedbackService } from '../../services/feedbackService/feedback.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.scss'
})
export class FeedbackFormComponent implements OnInit {
  inputData:any
  feedbackForm: FormGroup;
  selectedSatisfaction: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<TicketFormComponent>, 
  private fb: FormBuilder, private feedbackSer: FeedbackService){
    this.feedbackForm = this.fb.group({
      satisfactionLevel: [''],
      feedback: ['']
    });
   }

  ngOnInit(): void {
    this.inputData = this.data
  }

  // Method to handle star selection
  selectSatisfaction(rating: number) {
    this.selectedSatisfaction = rating;
  }

  closeDialog(){
    this.ref.close()
  }

  submitFeedback(){
    this.feedbackSer.createFeedback(this.feedbackForm.value).subscribe(res => {
      console.log(res)
      this.closeDialog()
    })
  }

}
