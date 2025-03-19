import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/authService/auth.service';
import { TicketService } from '../../services/ticketService/ticket.service';
import { CategoryService } from '../../services/categoryService/category.service';
import { IssueTypeService } from '../../services/issueTypeService/issue-type.service';
import { PriorityService } from '../../services/priorityService/priority.service';
import { StatusService } from '../../services/statusService/status.service';

@Component({
  selector: 'app-ticket-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.scss'
})
export class TicketFormComponent {
  inputData:any
  myForm:FormGroup;
  editData:any;
  role = ''

  issue_category_list = [
    {id: 1, name: 'Customer Service'},
    {id: 2, name: 'Finance'},
    {id: 3, name: 'Management'},
    {id: 4, name: 'IT'}
  ]

  issue_type_list = [
    {id: 1, name: 'Refund Request'},
    {id: 2, name: 'Budget Overspending'},
    {id: 3, name: 'Project Delay'},
    {id: 4, name: 'Network'}
  ]

  priority_list = [
    {id: 1, name: 'Low'},
    {id: 2, name: 'Medium'},
    {id: 3, name: 'High'},
    {id: 4, name: 'Critical'}
  ]

  status_list = [
    {id: 1, name: 'Open'},
    {id: 2, name: 'In-Progress'},
    {id: 3, name: 'Done'},
    {id: 4, name: 'Closed'}
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<TicketFormComponent>, 
  private builder:FormBuilder, private authService: AuthService, private ticketSer: TicketService, private categorySer: CategoryService,
                private issueTypeSer: IssueTypeService, private prioritySer: PriorityService, private statusSer: StatusService) {
    this.myForm = this.builder.group({
      issue_category: [''],
      issue_type: [''],
      priority: [''],
      status: [''],
      criterias: [''],
      reporter: [''],
      assigned_to: [''],
      deadline: ['']
    })
  }

  ngOnInit(): void {
    // Modify here when you will get the API
    this.ticketSer.getAllTickets().subscribe((tickets:any) => {
      // this.ticket_list = tickets;
    })

    // Modify here when you will get the API
    this.categorySer.getAllIssueCategory().subscribe((categories:any) => {
      // this.issue_category_list = categories;
    })

     // Modify here when you will get the API
     this.issueTypeSer.getAllIssueType().subscribe((type:any) => {
      // this.issue_type_list = type;
    })

     // Modify here when you will get the API
     this.prioritySer.getAllPriority().subscribe((priority:any) => {
      // this.priority_list = priority;
    })

     // Modify here when you will get the API
     this.statusSer.getAllStatus().subscribe((status:any) => {
      // this.status_list = status;
    })

    this.authService.getUserDetails().subscribe(user => {
      this.role = user.role
    });
    this.inputData = this.data
    if(this.inputData.id>0){
      this.setPopupData(this.inputData.id)
    }
  }

  setPopupData(id:number){
    this.ticketSer.getTicketById(id).subscribe(res => {
      this.editData = res
      this.myForm.setValue({
        issue_category: this.editData.issue_category,
        issue_type: this.editData.issue_type,
        priority: this.editData.priority,
        status: this.editData.status,
        criterias: this.editData.criterias,
        reporter: this.editData.reporter,
        assigned_to: this.editData.assigned_to,
        deadline: this.editData.deadline,
      })
    })
  }

  closePopup(){
    this.ref.close()
  }

  createTicket(){
    // console.log(this.myForm.value)
    this.ticketSer.createTicket(this.myForm.value).subscribe(res => {
      // console.log(res)
      this.closePopup()
    })
  }

  updateTicket(){
    // console.log(this.myForm.value)
    this.ticketSer.updateTicket(this.myForm.value).subscribe(res => {
      // console.log(res)
      this.closePopup()
    })
  }
}
