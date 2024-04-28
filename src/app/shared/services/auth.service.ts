import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError , of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  constructor(private http:HttpClient) {}
  uri = "http://localhost:8010/api/teachers";
  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  isLoggedIn() {
    const promesse = new Promise((resolve, reject) => {
    const logIn = localStorage.getItem('login');
    let valueReturn = false;
    if(logIn !== null) {
      valueReturn = true;
    }
    resolve(valueReturn);
  });
  return promesse;
  }

  logInConnexion(name: string, mdp: string): Observable<any> {
    const body = { name: name, mdp: mdp };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.uri, body, { headers: headers }).pipe(
    catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      console.error('Une erreur s\'est produite :', error.error.message);
    } else {
      // Erreur côté serveur
      console.error(
        `Code d'erreur : ${error.status}, ` +
        `Message : ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur
    return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
  }

  // méthode pour déconnecter l'utilisateur
  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin() {
    const isAdmin = localStorage.getItem('login');
    if(isAdmin == 'true') {
      return true;
    }
    return false;
  }
}
