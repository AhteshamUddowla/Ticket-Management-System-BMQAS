import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FeedbackFormComponent } from '../feedback-form/feedback-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-details',
  imports: [MaterialModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class TicketDetailsComponent {
  ticket = {
    ticketId: 'T12345',
    issueCategoryType: 'Software Bug',
    priority: 'High',
    description: 'Customer unable to log in after update.',
    status: 'In Progress',
    assignedStaff: {
      name: 'John Doe',
      designation: 'Software Engineer',
      mobile: '123-456-7890'
    },
    lastUpdated: new Date(),
    comments: [
      { user: 'Customer', text: 'I can’t access my account.', timestamp: new Date() },
      { user: 'Support', text: 'We are looking into the issue.', timestamp: new Date() }
    ]
  };

  newComment: string = '';
  completed=false

  steps = [
    { label: 'Open', icon: 'assignment', completed: true },
    { label: 'Assigned', icon: 'person', completed: true },
    { label: 'In Progress', icon: 'autorenew', completed: false },
    { label: 'Done', icon: 'check_circle', completed: false },
    { label: 'Closed', icon: 'lock', completed: false }
  ];

  // events:any[] = [
  //   { date: '08 Dec 11:53', status: 'Delivered', description: 'Yay! Your order has been delivered, we hope you like it! Tap here to share a review [Chattogram Sadar]' },
  //   { date: '08 Dec 09:22', status: 'Rider will Attempt to Deliver Today', description: 'Our delivery partner BD-DEX will attempt to deliver your order today [Chattogram Sadar]' },
  //   { date: '08 Dec 09:22', status: 'Order Reached Delivery Facility', description: 'Your order has reached our delivery facility from where it will be attempted to be delivered [Chattogram Sadar]' },
  //   { date: '07 Dec 10:54', status: 'Order near your Delivery Facility', description: 'Order is near your Delivery Facility [Chattogram Sadar]' },
  //   { date: '07 Dec 00:36', status: 'Departed from Daraz Distribution Center', description: 'Your order has departed from Daraz Distribution Center [Dhaka - North]' }
  // ];

  // statuses = [
  //   { name: 'Processing', active: true },
  //   { name: 'Packed', active: true },
  //   { name: 'Shipped', active: false },
  //   { name: 'Delivered', active: false }
  // ];

  constructor(private dialog:MatDialog, private router:Router){}

  // updateStatus(index: number) {
  //   this.statuses.forEach((status, i) => {
  //     status.active = i <= index;
  //   });
  // }

  addComment() {
    if (this.newComment.trim()) {
      this.ticket.comments.push({
        user: 'Support',
        text: this.newComment,
        timestamp: new Date()
      });
      this.newComment = ''; // Clear input field after submission
    }
  }

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'High': return 'warn';
      case 'Medium': return 'accent';
      case 'Low': return 'primary';
      default: return 'primary';
    }
  }

  send(){
    console.log('send')
  }

  addFeedback(){
    this.openPopup(0, 'add', 'Give your feedback', FeedbackFormComponent)
  }

  openPopup(id:number, action:string, title:any, component:any){
    var _popup = this.dialog.open(component, {
      width: '40%',
      disableClose: true,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        id:id,
        title: title,
        action: action
      }
    })
    _popup.afterClosed().subscribe(item => {
      this.router.navigateByUrl('tickets-details')
    })
  }
}
