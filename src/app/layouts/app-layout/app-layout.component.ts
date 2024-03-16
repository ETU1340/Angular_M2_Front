import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapLayoutSidebarInset,
  bootstrapPlusLg,
} from '@ng-icons/bootstrap-icons';
import { heroHome } from '@ng-icons/heroicons/outline';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AssignmentsComponent } from '../../assignments/assignments.component';
import { TeachersComponent } from '../../teachers/teachers.component';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    AssignmentsComponent,
    MatSidenavModule,
    NgIconComponent,
    TeachersComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
  providers: [
    provideIcons({ bootstrapLayoutSidebarInset, heroHome, bootstrapPlusLg }),
  ],
})
export class AppLayoutComponent {
  title = 'Application de gestion des assignments';
  showFiller = true;

  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}
  login() {
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    this.router.navigate(['/login']);
    // on navigue vers la page d'accueil
  }
}
