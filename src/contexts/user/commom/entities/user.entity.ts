export class UserEntity {
  id: number;
  login: string;
  password: string;
  name: string;
  surname?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}