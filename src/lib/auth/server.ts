import { db } from "@/db";
import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      gender: {
        type: "string",
        required: true,
        input: true,
      },
      role: {
        type: "string",
        required: false,
        defaultValue: "member",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
        input: false,
      },
      address: {
        type: "string",
        required: false,
        input: false,
      },
      city: {
        type: "string",
        required: false,
        input: false,
      },
      postalCode: {
        type: "string",
        required: false,
        input: false,
      },
    },
  },
});
