import { Injectable, Type } from "@angular/core";
import { HttpParams } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../models/employee.model";
import { map, Observable } from "rxjs";
import { Male } from "@mui/icons-material";


@Injectable({providedIn:'root'})
export class EmployeesService {

  constructor(private _http: HttpClient) {}

 
getEmployeesFromServer(): Observable<Employee[]> {
  return this._http.get<Employee[]>('https://localhost:7276/api/Employees').pipe(
    map((employees: Employee[]) => {
      return employees.map(employee => ({
        ...employee,
        StartWork: new Date(employee.startWork),
        BirthDate: new Date(employee.birthDate)
      }));
    })
  );
}


deleteEmployee(employeeId: number): Observable<void> {
  return this._http.delete<void>(`https://localhost:7276/api/Employees/${employeeId}`);
}

updateEmployee(employeeId: number,employee: Employee): Observable<Employee> {
    employee.roles.forEach((role, index) => {
      employee.roles[index].enterWorking=new Date(employee.roles[index].enterWorking);
      })
   employee.startWork=new Date(employee.startWork);
   employee.birthDate=new Date(employee.birthDate);
  return this._http.put<Employee>(`https://localhost:7276/api/Employees/${employeeId}`, employee);
}


 addEmployeeToServer(employee: Employee): Observable<Employee> {
   employee.startWork=new Date(employee.startWork);
   employee.birthDate=new Date(employee.birthDate);
   employee.roles.forEach((role, index) => {
   employee.roles[index].enterWorking=new Date(employee.roles[index].enterWorking);
   })
   return this._http.post<Employee>("https://localhost:7276/api/Employees", employee);
 }
}