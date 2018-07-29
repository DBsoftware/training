import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }

}