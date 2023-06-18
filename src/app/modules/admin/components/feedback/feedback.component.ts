import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackSummary } from 'src/app/model/feedback-summary';
import { FeedbackServiceService } from 'src/app/services/feedback-service.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

 formFeedback = new FormGroup({
    feedbackType: new FormControl('', Validators.required),
    feedbackField: new FormControl('', [
      Validators.required, 
      Validators.minLength(25), 
      Validators.maxLength(3000)
    ])
  })

  submitted = false;
  isShowSAlert = false;
  feedbackSummary : FeedbackSummary = {}
  PPoor: number= 0;
  PFair: number= 0;
  PGood: number= 0;
  PVeryGood: number= 0;
  PExcellent: number= 0;
  CsExcellent: string = "0%";
  constructor(private feedbackServiceService: FeedbackServiceService) {}

  ngOnInit(): void {

    this.retrieveFeedback();
  }

  retrieveFeedback(): void {

    this.feedbackServiceService.getSummary()
      .subscribe({
        next: (data) => {
          
          this.feedbackSummary = data;
          console.log(this.feedbackSummary);
          this.PExcellent = this.percentage(this.feedbackSummary.total??0, this.feedbackSummary.excellent??0);
          this.CsExcellent = this.PExcellent + "%";
          this.PVeryGood = this.percentage(this.feedbackSummary.total??0, this.feedbackSummary.veryGood??0);
          this.PGood = this.percentage(this.feedbackSummary.total??0, this.feedbackSummary.good??0);
          this.PFair = this.percentage(this.feedbackSummary.total??0, this.feedbackSummary.fair??0);
          this.PPoor = this.percentage(this.feedbackSummary.total??0, this.feedbackSummary.poor??0);
    
          console.log(this.PExcellent);
        },
        error: (e) => console.error(e)
      });

      console.log(this.feedbackSummary);



  }

  onSubmit(): void {

    console.log(this.formFeedback.value)
    this.submitted = true;
    if (this.formFeedback.valid) {

      const data = {
        email : "admin@smartApp.lk",
        feedbackType: this.formFeedback.controls.feedbackType.value,
        feedbackField:  this.formFeedback.controls.feedbackField.value
      };

      console.log(data)
      this.feedbackServiceService.create(data).subscribe(
        response => {
          console.log(response);
          this.submitted = false;
          this.formFeedback.reset(); 
          this.formFeedback.clearValidators();
          this.isShowSAlert = true;
        },
        error => {
          console.log(error);
        });
    }
  }

  changeFeedbackType( e : any ) : void {
    console.log(e.target.value);
  }

  clearformFeedback() { this.formFeedback.reset(); }

  SetformFeedback() { this.formFeedback.setValue({feedbackType: '', feedbackField: ''}); }

  percentage(total : number, value : number ): number {

    var result = 0;
    
     result = (value)/(total/100);

    return result;

  }

}
