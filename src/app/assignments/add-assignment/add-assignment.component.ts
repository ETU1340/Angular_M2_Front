import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { StudentCardComponent } from '../../students/student-card/student-card.component';
import { StudentsService } from '../../shared/students.service';
import { MatSelectModule } from '@angular/material/select';
import { SubjectsService } from '../../shared/subjects.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    StudentCardComponent,
    MatSelectModule,
  ],
})
export class AddAssignmentComponent implements OnInit {
  // champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;
  assignedStudent: { name: string; photo: string } | null = null;
  subject: string = '';
  // modal controller
  showModal = false;

  //
  students: { name: string; photo: string }[] = [];
  subjects: string[] = [];
  constructor(
    private assignmentsService: AssignmentsService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.students = this.studentsService.getStudents();
    this.subjects = this.subjectsService.getSubjects();
  }
  onSubmit(event: any) {
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();
    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
        // On navigue pour afficher la liste des assignments
        // en utilisant le router de manière programmatique
        this.router.navigate(['/home']);
      });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  setSelectedStudent(index: number) {
    this.assignedStudent = this.students[index];
    this.toggleModal();
  }
}
