
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../services/Employees.service';
import Swal from 'sweetalert2';
import { Role } from '../../models/role.model';
import { Type } from '../../models/employee.model';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})


export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  typeOptions: string[] = ["MALE", "FEMALE"];
  typeOption:Type[]=[0,1];
  roleName:string[]=['TECHER', 'PRINCIPAL', 'DEVELOPER'];
   employee!: Employee;
   employeeAfterUpdate!:Employee;
   num=0;
   roles:Role[]=[];

  constructor(private dialog: MatDialog,private route: ActivatedRoute, private _employeesService: EmployeesService, private fb: FormBuilder,private router: Router) {}
  
  ngOnInit(): void {
        this.employeeForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          typeEmployee: ['', Validators.required],
          tz: ['', [Validators.required, this.validateTZ]],
          startWork: ['',[Validators.required,this.validateStartWork]],
          birthDate: ['', Validators.required]
        });
    
        // Retrieve the employee data from the navigation state
        this.route.paramMap.subscribe(params => {
          this.employee = history.state.employee;
          if (this.employee) {
            this.num=1;
            this.employeeForm.patchValue({
              firstName: this.employee.firstName,
              lastName: this.employee.lastName,
              typeEmployee: this.employee.typeEmployee,
              tz: this.employee.tz,
              startWork: this.employee.startWork,
              birthDate: this.employee.birthDate
            });
          }
        });
        this.employeeForm.get('startWork')?.setValidators(this.validateStartWork());
   }
   
  addEmployee() {
    if (!this.employee) {
       this.employee=this.employeeForm.value,
       this.employee.roles=this.roles;
      this._employeesService.addEmployeeToServer(this.employee).subscribe(() => {
        // Refresh the data source after addition
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The employee was successfully added",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          this.router.navigate(['/details']);
        }, 1500); 
      });
    } else {
      this.employeeAfterUpdate=this.employeeForm.value;
      this.employeeAfterUpdate.roles=this.employee.roles;
      this._employeesService.updateEmployee(this.employee.id,this.employeeAfterUpdate ).subscribe(() => {
        // Refresh the data source after addition
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The employee has been updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
        
          this.router.navigate(['/details']);
        }, 1500); 
      }       
      );
    }
  } 

  editRole(role: Role,i:number) {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '500px',
      data: { roleData: role, startWork: this.employeeForm.get('startWork')?.value|| this.employee.startWork, existingRoles: this.employee?.roles||null }
    });

    dialogRef.afterClosed().subscribe((updatedRole: Role) => {
      // Handle the updated role data
      if (updatedRole) {
       this.employee.roles[i]=updatedRole;
       Swal.fire({
        position: "top-end",
        icon: "success",
        title: "The role has been updated successfully, (remember to save in the DataBase)",
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
      
      }, 1500); 
      }
    });
  }

  addRole() {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '500px', 
      data: {
        startWork: this.employeeForm.get('startWork')?.value||null,  
        existingRoles:[...(this.employee?.roles || []), ...this.roles]

      }
    });
    dialogRef.afterClosed().subscribe((role: Role) => { 
      if(role)
         {
        if(this.num===1)
          this.employee.roles.push(role);
        else
          this.roles.push(role);
         Swal.fire({
          position: "top-end",
          icon: "success",
          title: "The role has been added successfully, (remember to save in the DataBase)",
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
        
        }, 1500); 
         }   
    });
  }

  validateTZ(control: AbstractControl): { [key: string]: any } | null {
    const tzValue: string = control.value;
   
    if (tzValue && /^\d{9}$/.test(tzValue)) {
      return null; // Valid TZ
    } else {
      return { invalidTZ: true }; // Invalid TZ
    }
  }

  validateStartWork(){  
     return (control: any) => {
      const startWorkValue: Date = new Date(control.value);
      const rolesStartDates: Date[] = [];
     if (this.employee&&this.employee.roles) {
      this.employee.roles.forEach(role => {
        if (role.enterWorking) {
          rolesStartDates.push(new Date(role.enterWorking));
        }
      });
    }
  if(this.roles){this.roles.forEach(role => {
       if (role.enterWorking) {
         rolesStartDates.push(new Date(role.enterWorking));
       }
     });
     }
    if (rolesStartDates.some(date => startWorkValue > date)) {
       return { invalidStartWork: true }; // Invalid start work date
     }
     return null; // Valid start work date
  }
  
  }
}
