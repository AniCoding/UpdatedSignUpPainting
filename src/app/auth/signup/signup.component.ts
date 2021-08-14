import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { LocalStorageService } from 'src/app/services/storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatchPassword } from 'src/app/validators/match-password';
import { userExists } from 'src/app/validators/user-exists';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: IUser[] = []; 

  AuthForm = new FormGroup ({
    firstName: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9]+$/)]
  
    ),
    lastName: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9]+$/)]
  
    ),
    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-z0-9]+$/)]
  
    ),
    password: new FormControl ('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ] ),
    confirmPassword: new FormControl ('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
  }, { validators: [this.matchPassword.validate, userExists(this.usersService.getUsers())]})

  get getPassword() {
    return this.AuthForm.get('passwords')?.get('password');
  }

  get getConfirmPassword() {
    return this.AuthForm.get('passwords')?.get('confirmPassword');
  }

  onSubmit(){
    console.log('look in the local storage and if email doesnt exist add else return an error');
    if(this.AuthForm.valid) {
      const newUser: IUser = {
        id: this.newId(),
        firstName: this.AuthForm.get('firstName')?.value,
        lastName: this.AuthForm.get('lastName')?.value,
        email: this.AuthForm.get('email')?.value,
        password: this.AuthForm.get('password')?.value,
      };
  
      this.users.push(newUser);
      this.usersService.setUsers(this.users);
      this.usersService.setCurUser(this.AuthForm.get('email')?.value);
      this.router.navigate(['canvas']);
    }
  }

  showErrors() {
    const { dirty, touched, errors } = this.AuthForm.value;
    return dirty && touched && errors;
  }

  newId(): string {
    return String(Date.now());
  }

  constructor(
    private router: Router,
    private matchPassword: MatchPassword,
    private usersService: UsersService,
    ) { 
    
  }

  ngOnInit(): void {
    
  }

  navigateToSignIn(): void {
    this.router.navigate(['']);
  }
}
