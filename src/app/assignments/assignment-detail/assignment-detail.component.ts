import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssignmentsService } from '../../shared/services/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UtilityService } from '../../shared/services/utility.service';
import { IAssignment } from '../../shared/interfaces/subject.interface';
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css',
})
export class AssignmentDetailComponent implements OnInit {
  assignment!: IAssignment | undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    // Recuperation des query params (ce qui suit le ? dans l'url)
    console.log(this.route.snapshot.queryParams);
    // Recuperation des fragment (ce qui suit le # dans l'url)
    console.log(this.route.snapshot.fragment);

    // On recupere l'id de l'assignment dans l'URL à l'aide de ActivatedRoute
    const id = this.route.snapshot.params['id'];
    // On utilise le service pour récupérer l'assignment avec cet id
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
    });
  }

  onAssignmentRendu() {
    // on a cliqué sur la checkbox, on change le statut de l'assignment
    // if (this.assignmentTransmis) {
    //   this.assignmentTransmis.rendu = true;
    //   this.assignmentsService
    //     .updateAssignment(this.assignmentTransmis)
    //     .subscribe((message) => {
    //       console.log(message);
    //       // on navigue vers la liste des assignments
    //       this.router.navigate(['/home']);
    //     });
    // }
  }

  handleDelete() {
    if(!this.isAdmin()) {
      this.utilityService.showErrorMessage("Vous n'avez pas l'autorisation d'effectuer cette action !");
      return;
    }

    if (this.assignment) {
      this.assignmentsService
        .deleteAssignment(this.assignment)
        .subscribe((message) => {
          this.assignment = undefined;
          this.router.navigate(['/app/']);
        });
    }
  }

  handleUpdate() {
    if(!this.isAdmin()) {
      this.utilityService.showErrorMessage("Vous n'avez pas l'autorisation d'effectuer cette action !") ;
      return;
    }
    this.router.navigate(['/app/assignment/edit/' + this.assignment?._id]);
  }

  isAdmin() {
    return this.authService.loggedIn;
  }


  }
