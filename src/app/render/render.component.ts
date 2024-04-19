import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { AssignmentsService } from '../shared/assignments.service';
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
  imports: [DragDropModule,NgFor,FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,]
})
export class RenderComponent {
  assignmentReturned: Assignment[] = [];
  assignmentNotReturned: Assignment[] = [];
  assignement: any;
  dropEvent: any;
  showModal = false;
  remarkTeacher ='';
  noteTeacher = '';

  constructor(
    private assignmentsService: AssignmentsService,
  ) {}
 returned =     this.assignmentsService
 .getAssignmentReturned()
 .subscribe((data) => {
  this.assignmentReturned = data;
 });

 toggleModal() {
  this.showModal = !this.showModal;
}
 notReturned =     this.assignmentsService
 .getAssignmentNotReturned()
 .subscribe((data) => {
  this.assignmentNotReturned = data;

 });
//methode pour deplacé un assignement vers la partie non rendu
drop(event: CdkDragDrop<Assignment[]>) {
  this.dropEvent = event;
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    this.assignement= event.previousContainer.data[0];
    this.toggleModal();
  }
}

  
//action de la modal pour ajouter le note et remarque
onSubmit() {
  //mis à jour de l'assignement dans la bdd
  this.assignement.note = this.noteTeacher;
  this.assignement.remark =this.remarkTeacher ;
  this.assignement.rendu = true;
  this.assignmentsService
  .updateAssignment(this.assignement).subscribe((message) => {
  this.toggleModal();
  });
//deplace l'assignement dans la partie rendu
  transferArrayItem(this.dropEvent.previousContainer.data,
    this.dropEvent.container.data,
    this.dropEvent.previousIndex,
    this.dropEvent.currentIndex);
  }

}
