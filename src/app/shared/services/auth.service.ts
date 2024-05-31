import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { urls } from './urls';
import { ITeacher } from '../interfaces/person.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;
  teacher: ITeacher | undefined;
  constructor(private http: HttpClient) {}
  // uri = "http://localhost:8010/api/teachers";
  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  isLoggedIn() {
    const promesse = new Promise((resolve, reject) => {
      const logIn = localStorage.getItem('login');
      let valueReturn = false;
      if (logIn !== null) {
        valueReturn = true;
      }
      resolve(valueReturn);
    });
    return promesse;
  }

  logInConnexion(name: string, mdp: string): Observable<any> {
    const body = { name: name, mdp: mdp };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<any>(urls.auth.login, body, { headers: headers })
      .pipe(catchError(this.handleError));
  }
  setTeacher(teacher: ITeacher) {
    this.teacher = teacher;
  }
  getTeacher() {
    if (!this.teacher) {
      this.teacher = JSON.parse(localStorage.getItem('teacher') || '{}');
    }
    return this.teacher;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error("Une erreur s'est produite :", error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur : ${error.status}, ` + `Message : ${error.error}`
      );
    }
    // Retourne une observable avec un message d'erreur
    return throwError(
      "Une erreur s'est produite. Veuillez réessayer plus tard."
    );
  }

  logout() {
    localStorage.removeItem('login');
    this.loggedIn = false;
  }

  isAdmin() {
    const isAdmin = localStorage.getItem('login');
    if (isAdmin == 'true') {
      return true;
    }
    return false;
  }
}
