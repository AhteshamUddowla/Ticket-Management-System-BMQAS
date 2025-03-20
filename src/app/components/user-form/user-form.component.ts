import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/authService/auth.service';
import { TicketService } from '../../services/ticketService/ticket.service';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { UserService } from '../../services/userService/user.service';
import { RoleService } from '../../services/roleService/role.service';

@Component({
  selector: 'app-user-form',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  inputData:any
  myForm:FormGroup;
  editData:any;

  role_list = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Guest'},
    {id: 3, name: 'Employee'}
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ref:MatDialogRef<UserFormComponent>, 
    private builder:FormBuilder, private authService: AuthService, private userSer: UserService, private roleSer: RoleService) {
      this.myForm = this.builder.group({
        first_name: [''],
        last_name: [''],
        username: [''],
        email: [''],
        phone: [''],
        role: ['']
      })
    }

    ngOnInit(): void {
      this.inputData = this.data

       // Modify here when you will get the API
       this.roleSer.getAllRoles().subscribe((roles:any) => {
        // this.role_list = roles;
      })
      
      if(this.inputData.id>0){
        this.setPopupData(this.inputData.id)
      }
    }

    setPopupData(id:any){
      this.userSer.getUserByID(id).subscribe(res => {
        this.editData = res
        this.myForm.setValue({
          first_name: this.editData.first_name,
          last_name: this.editData.last_name,
          username: this.editData.username,
          email: this.editData.email,
          phone: this.editData.phone,
          role: this.editData.role
        })
      })
    }

    closePopup(){
      this.ref.close()
    }

    updateUser(){
      // console.log(this.myForm.value)
      this.userSer.updateUser(this.myForm.value).subscribe(res => {
        console.log(res)
        this.closePopup()
      })
    }
}
