import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AssignmentsService } from '../../shared/services/assignments.service';
import { Router } from '@angular/router';
import { StudentCardComponent } from '../../students/student-card/student-card.component';
import { StudentsService } from '../../shared/services/students.service';
import { MatSelectModule } from '@angular/material/select';
import { SubjectsService } from '../../shared/services/subjects.service';
import { AuthService } from '../../shared/services/auth.service';
import { Student } from './../../shared/interfaces/person.interface';
import {
  IAssignment,
  ISubject,
} from '../../shared/interfaces/subject.interface';
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
    let nouvelAssignment: IAssignment = {
      dateRendu: this.dateDeRendu,
      rendu:false,
      name: this.nomAssignment,
      student: {
        _id: this.assignedStudent!._id,
        name:
          this.assignedStudent!.name.first +
          ' ' +
          this.assignedStudent!.name.last,
        profile: this.assignedStudent!.picture.thumbnail,
      },
      subject: {
        _id: this.selectedSubject!._id,
        name: this.selectedSubject!.title,
        picture: this.selectedSubject!.picture,
      },
      teacher: {
        _id: this.selectedSubject!.teacher._id,
        fullName: this.selectedSubject!.teacher.fullName,
        picture: this.selectedSubject!.teacher.picture,
      },
    };

    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((response) => {
        console.log(response);
        // this.router.navigate(['/app']);
      });
  }
  toggleModal() {
    this.showModal = !this.showModal;
  }
  setSelectedStudent(index: number) {
    this.assignedStudent = this.students[index];
    console.log(this.assignedStudent);

    this.toggleModal();
  }
  setSubject(event: any) {
    this.selectedSubject = this.subjects[event.value];
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}
