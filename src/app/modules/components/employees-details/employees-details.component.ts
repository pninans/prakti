
import { MatPaginator,MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/Employees.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {MatTableModule} from '@angular/material/table';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})

export class EmployeesDetailsComponent {
  displayedColumns: string[] = ['lastName','firstName', 'tz', 'startWork', 'delete','edit'];
  ELEMENT_DATA: Employee[] = [];
  dataSource: MatTableDataSource<Employee>;
  clickedRows = new Set<Employee>(); 
  searchText: string = '';

  constructor(private _employeesService: EmployeesService,private router: Router) {
    this.dataSource = new MatTableDataSource<Employee>();
   this.InitData();
  }
  InitData(){
    this._employeesService.getEmployeesFromServer().subscribe(data => {
      this.ELEMENT_DATA = data;
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }
  deleteEmployee(employeeId: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._employeesService.deleteEmployee(employeeId).subscribe(() => {
          // Refresh the data source after deletion
         this.InitData();
  
        
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
         });
       
      }
    });
   
  }
  editEmployee(employee: Employee) { 
    this.router.navigate(['/addEmployee'],{ state: { employee } });
  }
  addEmployee(){
    this.router.navigate(['/addEmployee']);
  }
  
  exportToExcel(): void {
    const data = this.dataSource.data.map(element => {
      return {
        'First Name': element.firstName,
        'Last Name': element.lastName,
        'Tz': element.tz,
        'Start Work': element.startWork
      };
    });
   
    const workbook: XLSX.WorkBook = XLSX.utils.book_new(); 
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'employees.xlsx');
  }
  
  applyFilter() {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
