export interface IUserFullName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IUser {
  name: IUserFullName;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
