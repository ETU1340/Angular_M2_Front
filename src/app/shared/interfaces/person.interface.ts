interface Location {
  street: {
    number: number;
    name: string;
  };
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: number;
}

export interface Name {
  title: string;
  first: string;
  last: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Dob {
  date: Date;
  age: number;
}

interface Registered {
  date: Date;
  age: number;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Student {
  _id: string;
  location: Location;
  gender: string;
  name: Name;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  picture: Picture;
  nat: string;
}

export interface ITeacher {
  gender: String;
  name: {
    title: String;
    first: String;
    last: String;
  };
  location: {
    street: {
      number: Number;
      name: String;
    };
    city: String;
    state: String;
    country: String;
    postcode: Number;
    coordinates: {
      latitude: String;
      longitude: String;
    };
    timezone: {
      offset: String;
      description: String;
    };
  };
  email: String;
  login: {
    uuid: String;
    username: String;
    password: String;
    salt: String;
    md5: String;
    sha1: String;
    sha256: String;
  };
  dob: {
    date: Date;
    age: Number;
  };
  phone: String;
  cell: String;
  picture: {
    large: String;
    medium: String;
    thumbnail: String;
  };
  nat: String;
  isAdmin: Boolean;
}
