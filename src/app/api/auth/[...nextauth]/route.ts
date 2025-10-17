import NextAuth from "next-auth"
import { BetterAuth } from "better-auth"
import { PostgresAdapter } from "@auth/pg-adapter"
import { Pool } from "pg"
import Google from "next-auth/providers/google"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const {
  handlers: { GET, POST },
  auth,
} = BetterAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})