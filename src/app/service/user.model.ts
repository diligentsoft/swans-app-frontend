export class User {
  email: string;
  firstname: string;
  lastname: string;
  address: Address;
  telephone: string;
}

export class Address {
  buildingId: string;
  street: string;
  locality: string;
  city: string;
  postcode: string
}
