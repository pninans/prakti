import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role, RoleName } from '../../models/role.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  role!: Role;
  form!: FormGroup;
  roleNameOptions:  RoleName[] = [0, 1, 2];
  roleNameOptionsdeme: string[] = ['TECHER', 'PRINCIPAL', 'DEVELOPER' ];
  IsProncdeme:string[]=['Management Role','Non-management Role'];
  IsPronc:boolean[]=[true,false];
  startWork: Date=new Date(); 
  existingRoles: Role[] = []; 
 
  constructor( public dialogRef: MatDialogRef<AddRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private router: Router) {
    this.startWork = this.data?.startWork|| null;
    this.existingRoles=this.data?.existingRoles||null;
  }

  ngOnInit(): void {
    this.roleNameOptions = this.roleNameOptions.filter(option => !this.existingRoles?.some(role => role.name === option));
    this.roleNameOptions.push(this.data?.roleData?.name);
    this.form = this.fb.group({
      name: [this.data?.roleData?.name|| '', Validators.required], // Populate form with role data if available
      isPrincipal: [this.data?.roleData?.isPrincipal||'', Validators.required],
      enterWorking: [this.data?.roleData?.enterWorking||'',[ Validators.required,this.enterWorkingValidator]]
    });
    
    this.form.get('enterWorking')?.setValidators(this.enterWorkingValidator());
   
  }
  submitForm() { 
    this.role=this.form.value;
    this.dialogRef.close(this.role);
  }
 
  enterWorkingValidator() {
    return (control: any) => {
      if (this.startWork === null) {
        return { requiredStartWork: true };
      } else {
        const enterWorkingDate = new Date(control.value);
        if (enterWorkingDate < new Date(this.startWork)) {
          return { invalidEnterWorking: true };
        }
      }
      return null; 
    };
  }

}