import { Role } from "@workspace/db";

export {};

declare global {
  interface CustomJwtSessionClaims {
    role: Role;
  }
}
