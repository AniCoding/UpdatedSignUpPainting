import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { LocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersKey: string = 'users';
  curUserKey: string = 'curUser';

  constructor(private storage: LocalStorageService) { }

  getUsers(): IUser[] {
    const users = this.storage.get(this.usersKey);
    if (users) {
      return JSON.parse(users);
    }
    return [];
  }

  setUsers(users: IUser[]): void {
    const usersStr = JSON.stringify(users);
    this.storage.set(this.usersKey, usersStr);
  }

  setCurUser(email: string): void {
    this.storage.set(this.curUserKey, email);
  }
}
