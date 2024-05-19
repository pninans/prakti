import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesDetailsComponent } from './modules/components/employees-details/employees-details.component';
import { EmployeesService } from './modules/services/Employees.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddEmployeeComponent } from './modules/components/add-employee/add-employee.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './modules/components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AddRoleComponent } from './modules/components/add-role/add-role.component';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { LogoutComponent } from './modules/components/logout/logout.component';
import {  Routes } from '@angular/router'; 
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesDetailsComponent,
    AddEmployeeComponent,
    LoginComponent,
    AddRoleComponent,
    LogoutComponent,

    
    
    
  ],
  imports: [
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    MatTableModule, 
    MatPaginatorModule,
    AppRoutingModule,
    RouterModule, 
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
       { path: 'details', component: EmployeesDetailsComponent },
      { path: 'addEmployee', component: AddEmployeeComponent },
      { path: 'addRole', component: AddRoleComponent },
       { path: 'logout', component: LogoutComponent },
      
      ])
  ],
  providers: [EmployeesService,{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }, // Optional: Set the locale
  { provide: DateAdapter, useClass: NativeDateAdapter }, provideAnimationsAsync() ], 
  bootstrap: [AppComponent],
  
})
export class AppModule { 

  
}
