import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor() {}
  // function get all subjects
  getSubjects() {
    // return list of subjects
    return [
      {
        subject: 'Base de donnees',
        teacher: 'Thomas Glenn',
        subjectUrl: '',
        teacherProfileUrl: '',
      },
      {
        subject: 'Base de donnees',
        teacher: 'Thomas Glenn',
        subjectUrl: '',
        teacherProfileUrl: '',
      },
    ];
  }
}
