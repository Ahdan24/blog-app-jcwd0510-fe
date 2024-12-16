import { User } from "./user";

export interface Blog {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  userId: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  user: Pick<User, "name">

}
