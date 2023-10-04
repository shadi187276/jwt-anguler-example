import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;
  isSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }
  onSubmit() {
    const usercerditionals = this.loginForm.value;
    if (usercerditionals) {
      this.authService.login(usercerditionals)
        .pipe(
          catchError((error) => {
            console.error('An error occurred:', error);
            alert('system faild')
            return throwError('Something went wrong. Please try again later.');
          })

        )
        .subscribe(
          res => { console.log(res); this.authService.setToken(res) },
          err => console.log(err.error.message),
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
    }
  }

}
