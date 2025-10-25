export enum UserRole {
  CHURCH = 'church',
  INDIVIDUAL = 'individual',
  NOT_LOGGED_IN = 'not_logged_in'
}

export interface User {
//   id: string;
  role: UserRole;
  name: string;
//   email: string;
  location: string;
//   address: string;

//   // Church-specific fields
//   denomination?: string;

  // Individual-specific fields

}