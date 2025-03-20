import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { TicketService } from '../../services/ticketService/ticket.service';
import { AuthService } from '../../services/authService/auth.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from '../../services/categoryService/category.service';
import { IssueTypeService } from '../../services/issueTypeService/issue-type.service';
import { PriorityService } from '../../services/priorityService/priority.service';
import { StatusService } from '../../services/statusService/status.service';

const ELEMENT_DATA: any[] = [
    {ticket_id: 'TK-1001', date: '26/02/25', deadline: '28/02/25', issue_category: 'Customer Service', issue_type: 'Refund Request', priority: 'Critical', status: 'Open', reporter_name: 'Jack', reporter_role: 'Guest', assigned_to: 'Peter'},
    {ticket_id: 'TK-1002', date: '27/02/25', deadline: '01/03/25', issue_category: 'Finance', issue_type: 'Budget Overspending', priority: 'Low', status: 'In-Progress', reporter_name: 'Jack', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1003', date: '26/02/25', deadline: '26/02/25', issue_category: 'Management', issue_type: 'Project Delay', priority: 'Medium', status: 'Closed', reporter_name: 'Ahtesham', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1004', date: '01/03/25', deadline: '03/03/25', issue_category: 'IT', issue_type: 'Network', priority: 'High', status: 'In-Progress', reporter_name: 'Jack', reporter_role: 'Guest', assigned_to: 'Peter'},
    {ticket_id: 'TK-1005', date: '02/03/25', deadline: '04/03/25', issue_category: 'HR', issue_type: 'Leave Request', priority: 'Medium', status: 'Open', reporter_name: 'Alice', reporter_role: 'Guest', assigned_to: 'John'},
    {ticket_id: 'TK-1006', date: '03/03/25', deadline: '05/03/25', issue_category: 'IT', issue_type: 'Software Bug', priority: 'High', status: 'In-Progress', reporter_name: 'Bob', reporter_role: 'Guest', assigned_to: 'Sarah'},
    {ticket_id: 'TK-1007', date: '04/03/25', deadline: '06/03/25', issue_category: 'Finance', issue_type: 'Invoice Issue', priority: 'Low', status: 'Open', reporter_name: 'Charlie', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1008', date: '05/03/25', deadline: '07/03/25', issue_category: 'Customer Service', issue_type: 'Complaint', priority: 'Critical', status: 'In-Progress', reporter_name: 'Diana', reporter_role: 'Guest', assigned_to: 'Mike'},
    {ticket_id: 'TK-1009', date: '06/03/25', deadline: '08/03/25', issue_category: 'Management', issue_type: 'Resource Allocation', priority: 'Medium', status: 'Closed', reporter_name: 'Eva', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1010', date: '07/03/25', deadline: '09/03/25', issue_category: 'IT', issue_type: 'Server Down', priority: 'High', status: 'Open', reporter_name: 'Frank', reporter_role: 'Guest', assigned_to: 'Laura'},
    {ticket_id: 'TK-1011', date: '08/03/25', deadline: '10/03/25', issue_category: 'HR', issue_type: 'Recruitment', priority: 'Low', status: 'In-Progress', reporter_name: 'Grace', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1012', date: '09/03/25', deadline: '11/03/25', issue_category: 'Finance', issue_type: 'Tax Query', priority: 'Medium', status: 'Open', reporter_name: 'Henry', reporter_role: 'Guest', assigned_to: 'Olivia'},
    {ticket_id: 'TK-1013', date: '10/03/25', deadline: '12/03/25', issue_category: 'Customer Service', issue_type: 'Feedback', priority: 'Low', status: 'Closed', reporter_name: 'Ivy', reporter_role: 'Guest', assigned_to: 'Unassigned'},
    {ticket_id: 'TK-1014', date: '11/03/25', deadline: '13/03/25', issue_category: 'IT', issue_type: 'Database Issue', priority: 'Critical', status: 'In-Progress', reporter_name: 'Jack', reporter_role: 'Guest', assigned_to: 'Peter'},
  ];

@Component({
  selector: 'app-ticket-list',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, TitleCasePipe, RouterLink],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [];
  displayedColumnsWithAction: string[] = [];

  // Change data source type
  dataSource: any[] = [];
  filterForm: FormGroup;
  filteredData!: MatTableDataSource<any>;
  role = ''
  pageSize = 10; 

  openTicketCount: number = 0;
  // closedTicketCount: number = 0;
  unassignedTicketCount: number = 0;
  assignedTicketCount: number = 0;
  dueTicketCount: number = 0;

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

  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog:MatDialog, private router:Router, private ticketSer: TicketService, 
              private authService:AuthService, private fb: FormBuilder, private categorySer: CategoryService,
              private issueTypeSer: IssueTypeService, private prioritySer: PriorityService, private statusSer: StatusService) {
    this.filteredData = new MatTableDataSource<any>([]);

    this.filterForm = this.fb.group({ 
      date: [''],        
      issue_category: [''],
      issue_type: [''],
      priority: [''],    
      status: [''],
      others: [''],      
    });
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

    this.getUser()
    this.filteredData.data = this.dataSource; 
    
    // Subscribe to form value changes
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after the last change
        distinctUntilChanged() // Only emit if the value is different from the previous one
      )
      .subscribe(() => {
        this.applyFilters();
      });

    // this.filteredData = [...this.dataSource]
  }

  ngAfterViewInit(): void {
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
  }

  // onPageChange(event: any) {
  //   this.pageSize = event.pageSize; 
  // }

  getUser(){
    this.authService.getUserDetails().subscribe(user => {
      this.role = user.role
      this.filterTicketsBasedOnRole(user.role, user.name);
      this.generateDisplayedColumns();
      this.updateTicketCounts(user.role, user.name); 
      this.countAssignedTickets(user.name);
    });
  }

  clearFilters() {
    this.filterForm.reset();
    this.filterForm.patchValue({ issue_category: '' });
    this.filterForm.patchValue({ issue_type: '' });
    this.filterForm.patchValue({ priority: '' });
    this.filterForm.patchValue({ status: '' });
  }
  
  updateTicketCounts(role: string, userName: string) {
    this.openTicketCount = this.dataSource.filter(ticket => ticket.status === 'Open').length;
    // this.closedTicketCount = this.dataSource.filter(ticket => ticket.status === 'Closed').length;
    this.unassignedTicketCount = this.dataSource.filter(ticket => ticket.assigned_to === 'Unassigned').length;
    this.dueTicketCount = this.countDueTickets(role, userName); 
  }

  countAssignedTickets(employeeName: string) {
    this.assignedTicketCount = this.dataSource.filter(ticket => ticket.assigned_to === employeeName).length;
  }

  countDueTickets(role: string, userName: string): number {
    const currentDate = this.convertToISODate(this.formatDate(new Date())); 
    return this.dataSource.filter(ticket => {
      const ticketDeadline = ticket.deadline; 
      const formattedDeadline = this.convertToISODate(this.formatDate(ticketDeadline)); 
      const isNotClosed = ticket.status !== 'Closed' && ticket.status !== 'Done'; 
  
      if (role === 'admin') {
        return isNotClosed && formattedDeadline < currentDate;
      }
      else if (role === 'employee') {
        return isNotClosed && formattedDeadline < currentDate && ticket.assigned_to === userName;
      }
      return false; 
    }).length;
  }

  filterTicketsBasedOnRole(role: string, userName: string) {
    // Replace 'ELEMENT_DATA' with ticket_list[]
    if (role === 'admin') {
      this.dataSource = ELEMENT_DATA.filter(ticket => ticket.status !== 'Closed');
    } else if (role === 'guest') {
      this.dataSource = ELEMENT_DATA.filter(ticket => ticket.reporter_name === userName && ticket.status !== 'Closed');
    } else if (role === 'employee') {
      this.dataSource = ELEMENT_DATA.filter(ticket => ticket.assigned_to === userName && ticket.status !== 'Closed');
    } else {
      this.dataSource = [];
    }
  }

  generateDisplayedColumns() {
    if (this.dataSource.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource[0]);

      this.displayedColumns = this.displayedColumns.filter(column => !['reporter_role'].includes(column));

      if (this.role == 'guest' ) {
        this.displayedColumns = this.displayedColumns.filter(column => column !== 'reporter_name');
      }
      else if (this.role == 'employee' ) {
        this.displayedColumns = this.displayedColumns.filter(column => column !== 'assigned_to');
      }

      this.displayedColumnsWithAction = ['sl_no', ...this.displayedColumns, 'action'];
    }
  }

  applyFilters() {
    const filters = this.filterForm.value;
    const selectedDate = filters.date ? this.formatDate(filters.date) : null;
  
    this.filteredData.data  = this.dataSource.filter(ticket => {
      const ticketDate = this.formatDate(ticket.date); 
  
      return (
        (!filters.others || ticket.ticket_id.includes(filters.others)
                         || ticket.reporter_name.toUpperCase().includes(filters.others.toUpperCase())
                         || ticket.assigned_to.toUpperCase().includes(filters.others.toUpperCase())) &&
        (!selectedDate || ticketDate === selectedDate) && 
        (!filters.issue_category || ticket.issue_category === filters.issue_category) &&
        (!filters.issue_type || ticket.issue_type === filters.issue_type) &&
        (!filters.priority || ticket.priority === filters.priority) &&
        (!filters.status || ticket.status === filters.status)
      );
    });
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
  
    let d: Date;
  
    if (typeof date === 'string') {
      const parts = date.split('/');
      if (parts.length === 3) {
        let year = parts[2];
        if (year.length === 2) {
          year = '20' + year;
        }
        d = new Date(`${year}-${parts[1]}-${parts[0]}`); 
      } else {
        d = new Date(date); 
      }
    } else {
      d = date; 
    }
  
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
  
    return `${day}/${month}/${year}`; 
  }

  convertToISODate(dateString: string): string {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month}-${day}`; 
    }
    return dateString; 
  }

  addTicket(){
    this.openPopup(0, 'add', 'Create a New Ticket', TicketFormComponent)
  }  

  editTicket(id:number){
    this.openPopup(id, 'update', 'Update Ticket', TicketFormComponent)
  }

  deleteTicket(id:number){
    this.ticketSer.deleteTicket(id).subscribe(res => {
      // console.log(res)
    })
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
      this.router.navigateByUrl('tickets')
    })
  }
}
