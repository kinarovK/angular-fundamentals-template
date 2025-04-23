import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   users = [
    { email: 'hemanth@gmail.com', password: 'password123', username: 'Hemanth' },
    // Add more mock users as needed
  ];

  authenticate(email: string, password: string) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    return user ? user.username : null;
  }
}
