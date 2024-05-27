import { Component,OnInit,ViewChild,NgZone} from '@angular/core';
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
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';

import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
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
    CdkVirtualScrollViewport,
    ScrollingModule,
    NgFor,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
})
export class RenderComponent implements OnInit {
  assignmentReturned: IAssignment[] = [];
  assignmentNotReturned: IAssignment[] = [];
  assignment: IAssignment | undefined;
  // pour virtual scroll infini
  @ViewChild('scrollerNotReturned') scrollerNotReturned!: CdkVirtualScrollViewport;
  @ViewChild('scrollerReturned') scrollerReturned!: CdkVirtualScrollViewport;
  dropEvent: any;
  showModal = false;
  remarkTeacher = '';
  noteTeacher = 10;

  pageReturned = 1;
  limitReturned = 10; 
  totalPagesReturned = 0;
  hasNextPageReturned!: boolean;
  nextPageReturned!: number;
  pageNotReturned = 1;
  limitNotReturned  = 10; 
  totalPagesNotReturned = 0;
  hasNextPageNotReturned!: boolean;
  nextPageNotReturned!: number;

  constructor(private assignmentsService: AssignmentsService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.loadAssignmentsReturned();
    this.loadAssignmentsNotReturned();
    

  }


  toggleModal() {
    this.showModal = !this.showModal;
  }

  loadAssignmentsNotReturned() {
  this.assignmentsService
    .getAssignmentNotReturned(this.pageNotReturned, this.limitNotReturned)
    .subscribe((data) => {
      console.log(data);
      this.assignmentNotReturned = [...this.assignmentNotReturned, ...data.assignments];
      this.totalPagesNotReturned = data.totalPages;
      this.nextPageNotReturned = data.nextPage;
      this.hasNextPageNotReturned = data.hasNextPage;
    });
  }

  loadAssignmentsReturned() {
    this.assignmentsService
      .getAssignmentReturned(this.pageReturned, this.limitReturned)
      .subscribe((data) => {
        console.log(data);
        this.assignmentReturned = [...this.assignmentReturned, ...data.assignments];
        this.totalPagesReturned = data.totalPages;
        this.nextPageReturned = data.nextPage;
        this.hasNextPageReturned = data.hasNextPage;
      });
  
    }
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
    if (this.dropEvent.previousContainer === this.dropEvent.container) {
      console.log(this.dropEvent.currentIndex);
      console.log(this.dropEvent.previousIndex);
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
    } else if( "mark" in this.dropEvent.previousContainer.data[0]) {
    console.log('assignement deja noté');

      this.assignment.isHanded = true;
      this.assignmentsService.updateAssignment(this.assignment).subscribe();
     transferArrayItem(
      this.dropEvent.previousContainer.data,
      this.dropEvent.container.data,
      this.dropEvent.previousIndex,
      this.dropEvent.currentIndex
    );
    } else {
      console.log('assignement pas noté');
      this.toggleModal();
    }
    
  }
  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    console.log(' ----- at ooooooooooooo----');
    // on s'abonne à l'évènement scroll du virtual scroller
    this.scrollerNotReturned
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scrollerNotReturned.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.pageNotReturned);
          this.ngZone.run(() => {

            console.log("hasnextPage:" +this.hasNextPageNotReturned);
            if (!this.hasNextPageNotReturned) return;
            this.pageNotReturned = this.nextPageNotReturned;
            this.loadAssignmentsNotReturned();
          });
      });

      this.scrollerReturned
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scrollerReturned.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
          console.log('On demande de nouveaux assignments');
          // on va faire une requête pour demander les assignments suivants
          // et on va concatener le resultat au tableau des assignments courants
          console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.pageReturned);
          this.ngZone.run(() => {

            console.log("hasnextPage:" +this.hasNextPageReturned);
            if (!this.hasNextPageReturned) return;
            this.pageReturned = this.nextPageReturned;
            this.loadAssignmentsReturned();
          });
      });
  }
  //action de la modal pour ajouter le note et remarque
  onSubmit() {
    if (!this.assignment) this.assignmentReturned;
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
