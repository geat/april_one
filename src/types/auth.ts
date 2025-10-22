import { Session, User } from "better-auth/types";

export interface ExtendedUser extends User {
  role: "admin" | "member";
  gender?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface ExtendedSession extends Session {
  user: ExtendedUser;
}
