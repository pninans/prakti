import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '@mui/icons-material';
import { filter, Subject, take, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   loginValid = true;
   username = '';
   password = '';
    hide = true;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  public ngOnInit(): void {
   
  }

  public onSubmit(): void {
    this._authService.login({ userName: this.username, password: this.password }).subscribe({
      next: () => {
        let timerInterval: any;
        Swal.fire({
          title: "SUCCESS!",
          html: "Transfers to the manager's access <b></b> milliseconds",
          timer: 3000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()?.querySelector("b");
            timerInterval = setInterval(() => {
              if (timer) {
                timer.textContent = `${Swal.getTimerLeft()}`; 
              }
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
       
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
  
        setTimeout(() => {
          this.router.navigate(['/details']);
        }, 3000);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while logging in!',
          footer: `Try again`
        });
      }
    });
  }
  
  
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
}
}