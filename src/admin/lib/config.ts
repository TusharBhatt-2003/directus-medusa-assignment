import Medusa from "@medusajs/js-sdk";

// You can adjust the baseUrl based on your Medusa environment (local or production)
export const sdk = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_API_URL || "http://localhost:9000", // Use environment variables
  debug: process.env.NODE_ENV === "development", // Enable debug only in development mode
  auth: {
    type: "session", // Use session-based authentication
  },
});
