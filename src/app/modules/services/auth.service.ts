import { Injectable, OnDestroy, Type } from "@angular/core";
import { HttpParams } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from "../models/employee.model";
import { map, Observable } from "rxjs";
import { Male } from "@mui/icons-material";
import { Login } from "../models/loginModel";
import { Router } from "@angular/router";


@Injectable({providedIn:'root'})
export class AuthService   {
    
    constructor(private _http: HttpClient) {}
   login(login:Login){
    return this._http.post("https://localhost:7276/api/Auth",login).pipe(
    );
   }
  }
