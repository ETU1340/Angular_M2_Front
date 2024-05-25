import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { IAssignment } from '../shared/interfaces/subject.interface';
import { AssignmentsService } from '../shared/services/assignments.service';
import { Assignment } from '../assignments/assignment.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
/**
 * @title Drag&Drop connected sorting
 */
@Component({
  selector: 'render.component',
  standalone: true,
  templateUrl: 'render.component.html',
  styleUrls: ['render.component.css'],
  imports: [
    DragDropModule,
    NgFor,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
})
export class RenderComponent {
  assignmentReturned: IAssignment[] = [];
  assignmentNotReturned: IAssignment[] = [];
  assignment: IAssignment | undefined;
  dropEvent: any;
  showModal = false;
  remarkTeacher = '';
  noteTeacher = 10;

  constructor(private assignmentsService: AssignmentsService) {}
  returned = this.assignmentsService
    .getAssignmentReturned()
    .subscribe((data) => {
      console.log(data);
      this.assignmentReturned = data;
    });

  toggleModal() {
    this.showModal = !this.showModal;
  }
  notReturned = this.assignmentsService
    .getAssignmentNotReturned()
    .subscribe((data) => {
      this.assignmentNotReturned = data;
    });

  // methode pour deplacé un assignment vers la partie non rendu
  drop(event: CdkDragDrop<IAssignment[]>) {
    this.dropEvent = event;
    this.assignment = event.previousContainer.data[0];
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // } else {
    //   this.assignment = event.previousContainer.data[0];
    //   this.toggleModal();
    // }
    if ('mark' in event.previousContainer.data[0]) {
      // moveItemInArray(
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
      transferArrayItem(
        this.dropEvent.previousContainer.data,
        this.dropEvent.container.data,
        this.dropEvent.previousIndex,
        this.dropEvent.currentIndex
      );
      this.assignment.isHanded = true;
      this.assignmentsService
        .updateAssignment(this.assignment)
        .subscribe((message) => {
          this.toggleModal();
        });
    } else {
      this.assignment = event.previousContainer.data[0];
      this.toggleModal();
    }
  }

  //action de la modal pour ajouter le note et remarque
  onSubmit() {
    if (!this.assignment) this.returned;
    //mis à jour de l'assignment dans la bdd
    this.assignment!.mark = this.noteTeacher;
    this.assignment!.remark = this.remarkTeacher;
    this.assignment!.isHanded = true;
    this.assignmentsService
      .updateAssignment(this.assignment!)
      .subscribe((message) => {
        this.toggleModal();
      });
    //deplace l'assignment dans la partie rendu
    transferArrayItem(
      this.dropEvent.previousContainer.data,
      this.dropEvent.container.data,
      this.dropEvent.previousIndex,
      this.dropEvent.currentIndex
    );
  }
}
