import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { HttpClient } from '@angular/common/http';
import { Student } from './interfaces/person.interface';
@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  uri = 'http://localhost:8010/api/students';
  constructor(private http: HttpClient) {}
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.uri);
  }
}
