import { Component } from '@angular/core';
import { AssignmentsService } from '../shared/services/assignments.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  stat:
    | {
        noMark: number;
        withMark: number;
        markedHanded: number;
      }
    | undefined;
  constructor(private assignmentsService: AssignmentsService) {}
  ngOnInit(): void {
    this.assignmentsService.getStat().subscribe((data: any) => {
      console.log(data);
      this.stat = data;
    });
  }
}
