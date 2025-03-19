import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from '../../services/userService/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { RoleService } from '../../services/roleService/role.service';

const ELEMENT_DATA: any[] = [
  { user_id: 'S-101', first_name: 'Ahtesham', last_name: 'Uddowla', username: 'ahtesham', email: 'ahtesham@gmail.com', phone: '0326548954', role: 'admin', active: 'Available' },
  { user_id: 'S-102', first_name: 'Sayeda', last_name: 'Muntaha', username: 'muntaha', email: 'muntaha@gmail.com', phone: '0314568788', role: 'guest', active: 'Work' },
  { user_id: 'S-103', first_name: 'Sayed', last_name: 'Riad', username: 'riad', email: 'riad@gmail.com', phone: '1365479551', role: 'employee', active: 'Available' },
  { user_id: 'S-104', first_name: 'John', last_name: 'Doe', username: 'johndoe', email: 'john@gmail.com', phone: '1234567890', role: 'employee', active: 'Work' },
  { user_id: 'S-105', first_name: 'Jane', last_name: 'Smith', username: 'janesmith', email: 'jane@gmail.com', phone: '0987654321', role: 'guest', active: 'Available' },
  { user_id: 'S-106', first_name: 'Alice', last_name: 'Johnson', username: 'alicej', email: 'alice@gmail.com', phone: '1122334455', role: 'employee', active: 'Work' },
  { user_id: 'S-107', first_name: 'Bob', last_name: 'Brown', username: 'bobb', email: 'bob@gmail.com', phone: '5566778899', role: 'employee', active: 'Available' },
  { user_id: 'S-108', first_name: 'Charlie', last_name: 'Davis', username: 'charlied', email: 'charlie@gmail.com', phone: '9988776655', role: 'guest', active: 'Work' },
  { user_id: 'S-109', first_name: 'Diana', last_name: 'Evans', username: 'dianae', email: 'diana@gmail.com', phone: '4433221100', role: 'employee', active: 'Available' },
  { user_id: 'S-110', first_name: 'Eva', last_name: 'Green', username: 'evag', email: 'eva@gmail.com', phone: '6677889900', role: 'admin', active: 'Work' },
  { user_id: 'S-111', first_name: 'Frank', last_name: 'Harris', username: 'frankh', email: 'frank@gmail.com', phone: '7788990011', role: 'guest', active: 'Available' },
  { user_id: 'S-112', first_name: 'Grace', last_name: 'Lee', username: 'gracel', email: 'grace@gmail.com', phone: '9900112233', role: 'employee', active: 'Work' },
  { user_id: 'S-113', first_name: 'Henry', last_name: 'Martinez', username: 'henrym', email: 'henry@gmail.com', phone: '1122334455', role: 'employee', active: 'Available' },
];

@Component({
  selector: 'app-user-list',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent implements OnInit, AfterViewInit {
  // displayedColumns: string[] = ['sl_no', 'user_id', 'first_name', 'last_name', 'username', 'email', 'phone', 'role', 'action'];
  // dataSource = ELEMENT_DATA;

  displayedColumns: string[] = [];
  displayedColumnsWithAction: string[] = [];
  dataSource: any[] = [];
  filterForm: FormGroup;
  filteredData!: MatTableDataSource<any>;
  pageSize = 10; 

  totalEmployees: number = 0;
  availableEmployees: number = 0;
  totalGuests: number = 0;

  role_list = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Guest'},
    {id: 3, name: 'Employee'}
  ]

  active_list = [
    {id: 1, name: 'Work'},
    {id: 2, name: 'Available'}
  ]

  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog:MatDialog, private router:Router, private authService:AuthService, 
              private fb: FormBuilder, private userSer: UserService, private roleSer: RoleService){
      this.filteredData = new MatTableDataSource<any>([]);
      
      this.filterForm = this.fb.group({ 
        filter_all: [''],  
        role: [''],
        active: ['']         
      });
  }

  ngOnInit(): void {
      // Modify here when you will get the API
      this.userSer.getAllUsers().subscribe((users:any) => {
        // this.user_list = users;
      })

      // Modify here when you will get the API
      this.roleSer.getAllRoles().subscribe((roles:any) => {
        // this.role_list = roles;
      })
  
      this.dataSource = ELEMENT_DATA;
      this.generateDisplayedColumns();
      this.filteredData.data = this.dataSource; 

      this.calculateCounts();
      
      // Subscribe to form value changes
      this.filterForm.valueChanges
        .pipe(
          debounceTime(300), // Wait 300ms after the last change
          distinctUntilChanged() // Only emit if the value is different from the previous one
        )
        .subscribe(() => {
          this.applyFilters();
        });
    }
  
    ngAfterViewInit(): void {
      this.filteredData.paginator = this.paginator;
      this.filteredData.sort = this.sort
    }

    calculateCounts() {
      this.totalEmployees = this.dataSource.filter(user => user.role === 'employee').length;
      this.availableEmployees = this.dataSource.filter(user => user.role === 'employee' && user.active === 'Available').length;
      this.totalGuests = this.dataSource.filter(user => user.role === 'guest').length;
    }

    applyFilters() {
      const filters = this.filterForm.value;
    
      this.filteredData.data  = this.dataSource.filter(user => {
    
        return (
          (!filters.filter_all || user.user_id.includes(filters.filter_all) 
                               || user.username.includes(filters.filter_all)
                               || user.email.includes(filters.filter_all)
                               || user.phone.includes(filters.filter_all)) &&
          (!filters.role || user.role.toUpperCase() === filters.role.toUpperCase()) &&
          (!filters.active || user.active.toUpperCase() === filters.active.toUpperCase())
        );
      });
    }
    
    clearFilters() {
      this.filterForm.reset();
      this.filterForm.patchValue({ role: '' });
      this.filterForm.patchValue({ active: '' });
    }

    generateDisplayedColumns() {
      if (this.dataSource.length > 0) {
        this.displayedColumns = Object.keys(this.dataSource[0]);
        this.displayedColumnsWithAction = ['sl_no', ...this.displayedColumns, 'action'];
      }
    }

    editUser(id:number){
        this.openPopup(id, 'update', 'Update User', UserFormComponent)
      }
    
    deleteUser(id:number){
      this.userSer.deleteUser(id).subscribe(res => {
        console.log(res)
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
        this.router.navigateByUrl('users')
      })
    }
}
