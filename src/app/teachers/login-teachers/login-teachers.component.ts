import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './login-teachers.component.html',
  styleUrl: './login-teachers.component.css',
})
export class LoginComponent {
  // champs du formulaire
  nameTeacher = 'sadpeacock700';
  mdpTeacher = 'jellybea';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: any) {
    if (this.nameTeacher == '' || this.mdpTeacher === undefined) return;
    this.isLoading = true;
    this.authService
      .logInConnexion(this.nameTeacher, this.mdpTeacher)
      .subscribe((reponse) => {
        this.isLoading = false;
        if (reponse !== false) {
          this.errorMessage = '';
          localStorage.setItem('login', reponse.isAdmin);
          this.router.navigate(['/app']);
        } else {
          this.errorMessage = 'Information incorrecte';
          return;
        }
      });
  }
}
