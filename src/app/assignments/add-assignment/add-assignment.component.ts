import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/services/assignments.service';
import { Router } from '@angular/router';
import { StudentCardComponent } from '../../students/student-card/student-card.component';
import { StudentsService } from '../../shared/services/students.service';
import { MatSelectModule } from '@angular/material/select';
import { SubjectsService } from '../../shared/services/subjects.service';
import { AuthService } from '../../shared/services/auth.service';
import { Student } from './../../shared/interfaces/person.interface';
import { ISubject } from '../../shared/interfaces/subject.interface';
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
  assignedStudent: Student | null = null;
  selectedSubject: ISubject | null = null;
  subject: string = '';
  // modal controller
  showModal = false;

  //
  students: Student[] = [];
  subjects: ISubject[] = [];
  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private studentsService: StudentsService,
    private subjectsService: SubjectsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.studentsService.getStudents().subscribe((data) => {
      this.students = data;
    });
    this.subjectsService.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
    // this.subjects = this.subjectsService.getSubjects();
  }
  onSubmit(event: any) {
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomAssignment;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
        this.router.navigate(['/app']);
      });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  setSelectedStudent(index: number) {
    this.assignedStudent = this.students[index];
    this.toggleModal();
  }
  subjectOnChange(event: any) {
    this.selectedSubject = this.subjects[event.value];
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
