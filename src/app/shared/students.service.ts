import { Injectable } from '@angular/core';
import { students } from './student.data';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor() {}
  getStudents() {
    return students;
  }
}
