import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [`
    mat-form-field {
      width: 300px;
    }
  `]
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  constructor( private _authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    this._authService.registerUser({
      email: f.value.mail,
      password: f.value.pass
    });
  }

  

}
