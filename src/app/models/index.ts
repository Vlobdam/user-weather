export interface User {
  name: { first: string; last: string };
  gender: string;
  location: { city: string; country: string; coordinates: { latitude: string; longitude: string } };
  email: string;
  picture: { large: string };
}

export interface Weather {
  temperature: number;
  imgUrl: string;
}

