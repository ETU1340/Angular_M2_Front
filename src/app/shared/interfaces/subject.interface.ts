export interface ISubject {
  _id: string;
  title: string;
  picture: string;
  teacher: {
    fullName: string;
    picture: string;
  };
}
