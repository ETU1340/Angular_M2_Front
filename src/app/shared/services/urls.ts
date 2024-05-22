export const baseurl = 'http://localhost:8010/api/';
export const urls = {
  students: {
    get: baseurl + 'students',
  },
  subjects: {
    get: baseurl + 'subjects',
  },
  assignments: {
    post: baseurl + 'assignments',
    get: baseurl + 'assignments',
  },
};
