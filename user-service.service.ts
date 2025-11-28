import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userName: string | null = null;

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string | null {
    return this.userName;
  }
}
