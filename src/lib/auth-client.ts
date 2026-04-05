import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins"
import { dashClient, sentinelClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    dashClient(),
    sentinelClient({
      autoSolveChallenge: true, // Automatically solve PoW challenges
    }),
  ]
})