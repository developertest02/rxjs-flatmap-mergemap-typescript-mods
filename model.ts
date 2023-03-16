export interface Address {
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: number;
}

export interface User {
  id: number;
  name: string;
  address?: Address;
}

export interface UserWithAddress {
  user: User;
  address: Address;
}
