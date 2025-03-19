import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError } from 'rxjs';
import { User } from '../../models/interfaces/user';
import { Constant } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatusSubject = new BehaviorSubject<boolean>(this.getStoredUser());
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http:HttpClient) {  }

  private getStoredUser(): boolean {
    return !!(localStorage.getItem('user') || sessionStorage.getItem('user'));
  }

  updateLoginStatus(isLoggedIn: boolean) {
    this.loginStatusSubject.next(isLoggedIn);
  }

  // Change the Observable type & API Response Type(User[]) when you will get the API endpoint and update the API_URL in Constant file
  // Implement JWT-based authentication and HTTP interceptor for secure token handling.
  login(userCredential: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.get<User[]>(`${Constant.API_URL}${Constant.API_USER_METHODS.GET_ALL_USERS}`).pipe(
      map((users: User[]) => {
        const user = users.find(u => u.email === userCredential || u.phone === userCredential);

        if (user) {
          if (user.password === password) {
            if (rememberMe) {
              localStorage.setItem('user', JSON.stringify(user)); 
            }else{
              sessionStorage.setItem('user', JSON.stringify(user))            
            }

            this.updateLoginStatus(true);
            return { success: true, user, message: "Welcome back! You've successfully logged in." };
          } else {
            return { success: false, message: 'Incorrect password. Please check your credentials and try again.' };
          }
        } else {
          return { success: false, message: 'No account found. Please sign up or verify your details.' };
        }
      }),
      catchError(() => throwError(() => new Error("We're having trouble connecting to our servers. Please try again later.")))
    );
  }

  // Change the Observable type when you will get the API endpoint
  // Implement JWT-based authentication and HTTP interceptor for secure token handling.
  logOut():Observable<any>{
    localStorage.clear();
    sessionStorage.clear();
    this.updateLoginStatus(false);
    return of({success:true, message: 'You have been successfully logged out.'})
  }

  isLoggedIn(): boolean {
    return this.loginStatusSubject.value;
  }

  // Change the Observable type when you will get the API endpoint
  getUserDetails(): Observable<any> {
    return of(JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'));;  
  }
}

